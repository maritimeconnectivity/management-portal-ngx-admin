import { CertIssueDialogComponent } from './cert-issue-dialog/cert-issue-dialog.component';
import { TOKEN_DELIMITER } from './../../../../shared/app.constants';
import { EntityType } from './../../../models/menuType';
import { messages } from './../../../extra-components/chat/messages';
import { ActiveCertificatesColumn, RevokedCertificatesColumn } from '../../../models/columnForCertificate';
import { Component, Input, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Certificate as MCPCertificate, CertificateBundle, PemCertificate } from '../../../../backend-api/identity-registry';
import { FileHelperService } from '../../../../shared/file-helper.service';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute } from '@angular/router';
import { CertificateService } from '../../../../shared/certificate.service';

import { Convert } from 'pvtsutils';
import PrivateKeyInfo from 'pkijs/build/PrivateKeyInfo';
import Certificate from 'pkijs/build/Certificate';
import PFX from 'pkijs/build/PFX';
import SafeBag from 'pkijs/build/SafeBag';
import AuthenticatedSafe from 'pkijs/build/AuthenticatedSafe';
import CertBag from 'pkijs/build/CertBag';
import CertificationRequest from 'pkijs/build/CertificationRequest';
import AttributeTypeAndValue from 'pkijs/build/AttributeTypeAndValue';
import { stringToArrayBuffer } from 'pvutils';
import SafeContents from 'pkijs/build/SafeContents';
import PKCS8ShroudedKeyBag from 'pkijs/build/PKCS8ShroudedKeyBag';
import Attribute from 'pkijs/build/Attribute';
import { getRandomValues } from 'pkijs/build/common';
import { BitString, BmpString, fromBER, OctetString, PrintableString } from 'asn1js';
import { NbDialogService } from '@nebular/theme';

export interface LabelValueModel {
  label:string;
  valueHtml:string;
  linkFunction?:Function;
  linkValue?:any;
  linkClass?:string;
}
@Component({
  selector: 'ngx-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})

export class CertificatesComponent implements OnInit {

  settings = {
    mode: 'external',
    edit: {
      editButtonContent: '<small><i class="fas fa-file-download fa-xs"></i></small>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<small><i class="fas fa-ban fa-xs"></i></small>',
      confirmDelete: true,
    },
    hideSubHeader: true,
    actions: {
      position: 'right',
    }
  };

  source: LocalDataSource = new LocalDataSource();

  @Input() data: any[];
  @Input() forRevoked: boolean;
  @Input() entityMrn: string;
  @Input() entityTitle: string;
  @Input() entityType: string;
  @Input() orgMrn: string;
  @Input() instanceVersion: string;

  certificateTitle = "Certificate for ";

  constructor(private notifierService: NotifierService, private fileHelper: FileHelperService,
    private route: ActivatedRoute, private certificateService: CertificateService, private dialogService: NbDialogService) {
  }

  ngOnInit(): void {
    if (this.forRevoked) {
      this.settings['actions'] = undefined;
      this.settings['columns'] = RevokedCertificatesColumn;
    } else {
      this.settings['columns'] = ActiveCertificatesColumn;
    }

    this.isLoading = false;
    if (this.entityMrn) {
      this.generateLabelValues();
    }
  }

  open() {
    this.dialogService.open(CertIssueDialogComponent, {
      context: {
        title: 'Issuing a new certificate for:',
        isChoiceStep: true,
      },
    });
  }

  onEdit(event): void {
    this.download(event.data);
  }

  onDelete(event): void {
    if (window.confirm('Are you sure you want to revoke the certificate?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  download(certificate:MCPCertificate) {
    let pemCertificate:PemCertificate = {certificate:certificate.certificate};
    let certBundle:CertificateBundle = {pemCertificate:pemCertificate};
    this.fileHelper.downloadPemCertificate(certBundle, "Certificate for " + this.entityTitle, true, this.notifierService);
  }

  public isLoading: boolean;
  public certificateBundle: CertificateBundle;
  public showLocalIssueModal: boolean = false;
  public showsChoiceModal: boolean = false;
  public modalDescription: string;
  public choiceModalDescription: string;

  public labelValues: Array<LabelValueModel>;

  private serverGeneratedKeys: boolean = false;

  public zipAndDownload() {
    this.fileHelper.downloadPemCertificate(this.certificateBundle, this.entityTitle, this.serverGeneratedKeys, this.notifierService);
  }

  public showChoiceModal() {
    if (this.showsChoiceModal) {
      this.showsChoiceModal = false;
    }
    this.showLocalIssueModal = false;
    this.choiceModalDescription = `You are about to get a new certificate issued. Do you want to 
        generate the key pair for the certificate locally in your browser or do you want to let the 
        MIR API server generate it for you? NOTE that it is strongly recommended 
        to NOT let the server generate the key pair for you as in case of a breach of the 
        MIR API server, a malicious third party can potentially take control over your identity 
        by stealing your private key when it is generated. Also note that the possibility of 
        getting server generated key pairs will be removed completely in the future, and that MCP 
        ID service providers can already choose to disable it now.
        <br/>A third option is to generate the key pair and a CSR yourself - an example on how to 
        do this can be found 
        <a href="https://github.com/maritimeconnectivity/IdentityRegistry#certificate-issuing-by-certificate-signing-request" target="_blank">here</a>`;
    this.showsChoiceModal = true;
  }

  public showGenerationModal() {
    this.showsChoiceModal = false;
    let nameNoSpaces = this.entityTitle.split(' ').join('_');
    this.modalDescription = `Many operating systems and browsers require that certificates are 
        imported as a password protected PKCS#12 keystore. This can be generated either manually 
        using OpenSSL or by letting the browser generate it for you. 
        If you want to manually generate the keystore, which is the recommended approach, 
        you should click 'Manual', download the resulting zip file, unzip it and then use OpenSSL 
        to generate the keystore using the following command:
        <br><pre>openssl pkcs12 -export -out keystore.p12 -in Certificate_${nameNoSpaces}.pem -inkey PrivateKey_${nameNoSpaces}.pem</pre>
        This will prompt you for a passphrase to protect the keystore. If successful the command will 
        result in a PKCS#12 keystore file called 'keystore.p12'.
        <br>If you don't want to generate a keystore at all you can just skip executing the OpenSSL command.
        <br>As an alternative you can also let your browser generate a keystore for you by clicking 
        'Browser'. NOTE that this action will take a little while and the resulting keystore will 
        NOT be compatible with most major operating systems and browsers.`;
    this.showLocalIssueModal = true;
  }

  public issueNewWithServerKeys() {
    this.showsChoiceModal = false;
    this.isLoading = true;
    this.certificateService.issueNewCertificate(null, this.entityType as EntityType, this.entityMrn, this.instanceVersion)
        .subscribe((certificateBundle: CertificateBundle) => {
          this.certificateBundle = certificateBundle;
          this.serverGeneratedKeys = true;
          this.isLoading = false;
        }, err => {
          this.isLoading = false;
          if (err.status === 410) {
            this.notifierService.notify('error',
                'Generating certificates with server generated keys is not supported by ' +
                'this ID provider');
            return;
          }
          this.notifierService.notify('error',
              'Error when trying to issue new certificate', err.messages);
        });
  }

  public issueNewWithLocalKeys(generatePkcs12: boolean) {
    this.showLocalIssueModal = false;
    this.isLoading = true;
    let ecKeyGenParams = {name: 'ECDSA', namedCurve: 'P-384', typedCurve: ''};
    let keyResult = crypto.subtle.generateKey(ecKeyGenParams, true, ['sign', 'verify']);
    keyResult.then(keyPair => {
      let csr = new CertificationRequest();
      csr.subject.typesAndValues.push(new AttributeTypeAndValue({
        type: '2.5.4.3', // Common name
        value: new PrintableString({ value: 'Test' })
      }));
      csr.subjectPublicKeyInfo.importKey(keyPair.publicKey).then(() => {
        csr.sign(keyPair.privateKey, 'SHA-384').then(() => {
          let csrBytes = csr.toSchema().toBER(false);
          let pemCsr = this.toPem(csrBytes, 'CERTIFICATE REQUEST');
          this.certificateService.issueNewCertificate(pemCsr, this.entityType as EntityType, this.entityMrn, this.orgMrn)
              .subscribe((certificate: string) => {
                crypto.subtle.exportKey('pkcs8', keyPair.privateKey).then(rawPrivateKey => {
                  crypto.subtle.exportKey('spki', keyPair.publicKey).then(rawPublicKey => {
                    let privateKey = new PrivateKeyInfo({schema: fromBER(rawPrivateKey).result});

                    if (generatePkcs12) {
                      let rawCerts = this.convertCertChain(certificate);
                      let certs = rawCerts.map(cert =>
                          new Certificate({schema: fromBER(cert).result}));
                      let password = this.generatePassword();

                      Promise.resolve().then(() =>
                          this.generatePKCS12(privateKey, certs, password)).then(result => {
                        this.certificateBundle = {
                          pemCertificate: {
                            privateKey: this.toPem(rawPrivateKey, 'PRIVATE KEY'),
                            publicKey: this.toPem(rawPublicKey, 'PUBLIC KEY'),
                            certificate: certificate
                          },
                          pkcs12Keystore: new TextDecoder("utf-8").decode(result),
                          keystorePassword: password
                        };
                        this.isLoading = false;
                      }, err => {
                        this.isLoading = false;
                        this.notifierService.notify('error',
                            'PKCS#12 keystore could not be generated - ' + err.messages);
                      });
                    } else {
                      this.certificateBundle = {
                        pemCertificate: {
                          privateKey: this.toPem(rawPrivateKey, 'PRIVATE KEY'),
                          publicKey: this.toPem(rawPublicKey, 'PUBLIC KEY'),
                          certificate: certificate
                        }
                      };
                      this.isLoading = false;
                    }
                  }, err => {
                    this.isLoading = false;
                    this.notifierService.notify('error',
                        'Public key could not be exported - ' + err.messages);
                  });
                }, err => {
                  this.isLoading = false;
                  this.notifierService.notify('error',
                      'Private key could not be exported - ' + err.messages);
                });
              },
              err => {
                this.isLoading = false;
                this.notifierService.notify('error',
                    'Error when trying to issue new certificate - ' + err.messages);
              }
          );
        });
      });
    }, err => {
      this.isLoading = false;
      this.notifierService.notify('error',
          'Error when trying to issue new certificate - ' + err.messages);
    });
  }

  private generateLabelValues() {
    this.labelValues = [];
    this.labelValues.push({label: 'Name', valueHtml: this.entityTitle});
    this.labelValues.push({label: 'MRN', valueHtml: this.entityMrn.split(TOKEN_DELIMITER)[0]});
  }

  private toPem(arrayBuffer: ArrayBuffer, type: string): string {
    let b64 = Convert.ToBase64(arrayBuffer);
    let finalString = '';
    while (b64.length > 0) {
      finalString += b64.substring(0, 64) + '\n';
      b64 = b64.substring(64);
    }
    return `-----BEGIN ${type}-----\n${finalString}-----END ${type}-----\n`;
  }

  private convertCertChain(pemCertChain: string): Array<ArrayBuffer> {
    let certs = pemCertChain.split(/-----END CERTIFICATE-----/);
    certs = certs.slice(0, certs.length - 1);
    let tmp = certs.map(c => c.split(/-----BEGIN CERTIFICATE-----/)[1].replace(/\n/mg, ''));
    return tmp.map(c => Convert.FromBase64(c));
  }

  private generatePassword(): string {
    let charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_^$#&!%';
    let values = new Uint32Array(26);
    crypto.getRandomValues(values);
    let result = '';
    for (let i = 0; i < values.length; i++) {
      result += charset[values[i] % charset.length];
    }
    return result;
  }

  private generatePKCS12(privateKey: PrivateKeyInfo, certs: Array<Certificate>, password: string): Promise<ArrayBuffer> {
    const keyLocalIDBuffer = new ArrayBuffer(4);
    const keyLocalIDView = new Uint8Array(keyLocalIDBuffer);
    getRandomValues(keyLocalIDView);

    const certLocalIDBuffer = new ArrayBuffer(4);
    const certLocalIDView = new Uint8Array(certLocalIDBuffer);
    getRandomValues(certLocalIDView);

    const caCertLocalIDBuffer = new ArrayBuffer(4);
    const caCertLocalIDView = new Uint8Array(caCertLocalIDBuffer);
    getRandomValues(caCertLocalIDView);

    const bitArray = new ArrayBuffer(1);
    const bitView = new Uint8Array(bitArray);

    // tslint:disable-next-line:no-bitwise
    bitView[0] |= 0x80;

    const keyUsage = new BitString({
      valueHex: bitArray,
      unusedBits: 7
    });

    privateKey.attributes = [
      new Attribute({
        type: '2.5.29.15',
        values: [
          keyUsage
        ]
      })
    ];

    let certCn = '';
    certs[0].subject.typesAndValues.forEach(t => {
      if (t.type === '2.5.4.3') {
        certCn = t.value.valueBlock.value;
      }
    });

    let caCn = '';
    certs[1].subject.typesAndValues.forEach(t => {
      if (t.type === '2.5.4.3') {
        caCn = t.value.valueBlock.value;
      }
    });

    const pfx = new PFX({
      parsedValue: {
        integrityMode: 0,
        authenticatedSafe: new AuthenticatedSafe({
          parsedValue: {
            safeContents: [
              {
                privacyMode: 0,
                value: new SafeContents({
                  safeBags: [
                      new SafeBag({
                        bagId: '1.2.840.113549.1.12.10.1.2',
                        bagValue: new PKCS8ShroudedKeyBag({
                          parsedValue: privateKey
                        }),
                        bagAttributes: [
                            new Attribute({
                              type: '1.2.840.113549.1.9.20', // friendlyName
                              values: [
                                  new BmpString({ value: 'PKCS8ShroudedKeyBag from PKIjs' })
                              ]
                            }),
                            new Attribute({
                              type: '1.2.840.113549.1.9.21', // localKeyID
                              values: [
                                  new OctetString({ valueHex: keyLocalIDBuffer })
                              ]
                            }),
                            new Attribute({
                              type: '1.3.6.1.4.1.311.17.1', // pkcs12KeyProviderNameAttr
                              values: [
                                  new BmpString({ value: 'MCP using https://pkijs.org/' })
                              ]
                            })
                        ]
                      })
                  ]
                })
              },
              {
                privacyMode: 1,
                value: new SafeContents({
                  safeBags: [
                      new SafeBag({
                        bagId: '1.2.840.113549.1.12.10.1.3',
                        bagValue: new CertBag({
                          parsedValue: certs[0]
                        }),
                        bagAttributes: [
                            new Attribute({
                              type: '1.2.840.113549.1.9.20', // friendlyName
                              values: [
                                  new BmpString({ value: certCn })
                              ]
                            }),
                            new Attribute({
                              type: '1.2.840.113549.1.9.21', // localKeyID
                              values: [
                                  new OctetString({ valueHex: certLocalIDBuffer })
                              ]
                            }),
                            new Attribute({
                              type: '1.3.6.1.4.1.311.17.1', // pkcs12KeyProviderNameAttr
                              values: [
                                  new BmpString({ value: 'MCP using https://pkijs.org/' })
                              ]
                            })
                        ]
                      }),
                      new SafeBag({
                        bagId: '1.2.840.113549.1.12.10.1.3',
                        bagValue: new CertBag({
                          parsedValue: certs[1]
                        }),
                        bagAttributes: [
                          new Attribute({
                            type: '1.2.840.113549.1.9.20', // friendlyName
                            values: [
                              new BmpString({ value: caCn })
                            ]
                          }),
                          new Attribute({
                            type: '1.2.840.113549.1.9.21', // localKeyID
                            values: [
                              new OctetString({ valueHex: caCertLocalIDBuffer })
                            ]
                          }),
                          new Attribute({
                            type: '1.3.6.1.4.1.311.17.1', // pkcs12KeyProviderNameAttr
                            values: [
                              new BmpString({ value: 'MCP using https://pkijs.org/' })
                            ]
                          })
                        ]
                      })
                  ]
                })
              }
            ]
          }
        })
      }
    });

    let passwordConverted = stringToArrayBuffer(password);
    let sequence = Promise.resolve();

    sequence = sequence.then(
        () => pfx.parsedValue.authenticatedSafe.parsedValue.safeContents[0].value
            .safeBags[0].bagValue.makeInternalValues({
          password: passwordConverted,
          contentEncryptionAlgorithm: {
            name: 'AES-CBC', // OpenSSL can handle AES-CBC only
            length: 128
          },
          hmacHashAlgorithm: 'SHA-256',
          iterationCount: 100000
        })
    );

    sequence = sequence.then(
        () => pfx.parsedValue.authenticatedSafe.makeInternalValues({
          safeContents: [
            {
              // Empty parameters for first SafeContent since "No Privacy" protection mode there
            },
            {
              password: passwordConverted,
              contentEncryptionAlgorithm: {
                name: 'AES-CBC', // OpenSSL can handle AES-CBC only
                length: 128
              },
              hmacHashAlgorithm: 'SHA-256',
              iterationCount: 100000
            }
          ]
        })
    );

    sequence = sequence.then(
        () => pfx.makeInternalValues({
          password: passwordConverted,
          iterations: 100000,
          pbkdf2HashAlgorithm: 'SHA-256',
          hmacHashAlgorithm: 'SHA-256'
        })
    );

    sequence.then(() => {
      return pfx.toSchema().toBER(false) as ArrayBuffer;});
    return undefined;
  }
}
