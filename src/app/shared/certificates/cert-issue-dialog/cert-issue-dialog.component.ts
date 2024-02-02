/*
 * Copyright (c) 2024 Maritime Connectivity Platform Consortium
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {TOKEN_DELIMITER} from '../../app.constants';
import {EntityType} from '../../models/menuType';
import {Convert} from 'pvtsutils';

import {stringToArrayBuffer} from 'pvutils';

import {BitString, BmpString, fromBER, OctetString, PrintableString} from 'asn1js';
import {CertificateService} from '../../certificate.service';
import {FileHelperService} from '../../file-helper.service';
import {NotifierService} from 'angular-notifier';
import {
  Attribute,
  AttributeTypeAndValue,
  AuthenticatedSafe,
  CertBag,
  Certificate,
  CertificationRequest,
  getRandomValues,
  PFX,
  PKCS8ShroudedKeyBag,
  PrivateKeyInfo,
  SafeBag,
  SafeContents
} from 'pkijs';
import {CertificateBundle} from '../../models/certificateBundle';

const ab2str = (buf: ArrayBuffer) => {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

export interface LabelValueModel {
  label: string;
  valueHtml: string;
  linkFunction?: Function;
  linkValue?: any;
  linkClass?: string;
}

@Component({
  selector: 'ngx-cert-issue-dialog',
  templateUrl: './cert-issue-dialog.component.html',
  styleUrls: ['./cert-issue-dialog.component.scss']
})
export class CertIssueDialogComponent implements OnInit {

  @Input() entityMrn: string;
  @Input() entityTitle: string;
  @Input() entityType: string;
  @Input() orgMrn: string;
  @Input() instanceVersion: string;
  @Input() notifierService: NotifierService;
  @Input() fileHelper: FileHelperService;
  @Input() certificateService: CertificateService;
  @Input() updateCertificate: () => void;

  nameNoSpaces: string;
  isLoading: boolean;
  certificateBundle: CertificateBundle;
  labelValues: Array<LabelValueModel>;

  constructor(protected ref: NbDialogRef<CertIssueDialogComponent>) {
  }

  ngOnInit(): void {
    this.isLoading = false;
    if (this.entityMrn) {
      this.generateLabelValues();
      this.nameNoSpaces = this.entityTitle.split(' ').join('_');
    }
  }

  dismiss() {
    this.ref.close();
    this.updateCertificate();
  }

  locallyWManualKeystore(): void {
    this.issueNewWithLocalKeys(false);
  }

  locallyFromBrowser(): void {
    this.issueNewWithLocalKeys(true);
  }

  public download() {
    this.fileHelper.downloadPemCertificate(this.certificateBundle, this.entityTitle, this.notifierService);
    this.notifierService.notify('success', 'Chosen certificate has downloaded');
  }

  public issueNewWithLocalKeys(generatePkcs12: boolean) {
    this.isLoading = true;
    const ecKeyGenParams = {name: 'ECDSA', namedCurve: 'P-384', typedCurve: ''};
    const keyResult = crypto.subtle.generateKey(ecKeyGenParams, true, ['sign', 'verify']);
    keyResult.then(keyPair => {
      const csr = new CertificationRequest();
      csr.subject.typesAndValues.push(new AttributeTypeAndValue({
        type: '2.5.4.3', // Common name
        value: new PrintableString({value: 'Test'}),
      }));
      csr.subjectPublicKeyInfo.importKey(keyPair.publicKey).then(() => {
        csr.sign(keyPair.privateKey, 'SHA-384').then(() => {
          const csrBytes = csr.toSchema().toBER(false);
          const pemCsr = this.toPem(csrBytes, 'CERTIFICATE REQUEST');
          this.certificateService.issueNewCertificate(pemCsr, this.entityType as EntityType, this.entityMrn,
            this.orgMrn, this.instanceVersion)
            .subscribe((certificate) => {
              },
              err => {
                // successful response but failed due to PEM fitting to json format
                if (err.status === 201) {
                  {
                    const certificate = err.error.text;
                    crypto.subtle.exportKey('pkcs8', keyPair.privateKey).then(rawPrivateKey => {
                      crypto.subtle.exportKey('spki', keyPair.publicKey).then(rawPublicKey => {
                        const privateKey = new PrivateKeyInfo({schema: fromBER(rawPrivateKey).result});

                        if (generatePkcs12) {
                          const rawCerts = this.convertCertChain(certificate);
                          const certs = rawCerts.map(cert =>
                            new Certificate({schema: fromBER(cert).result}));
                          const password = this.generatePassword();

                          this.generatePKCS12(privateKey, certs, password).then(result => {
                            this.certificateBundle = {
                              certificate: certificate,
                              publicKey: this.toPem(rawPublicKey, 'PUBLIC KEY'),
                              privateKey: this.toPem(rawPrivateKey, 'PRIVATE KEY'),
                              pkcs12Keystore: result,
                              keystorePassword: password,
                            };
                            this.isLoading = false;
                            this.notifierService.notify('success', 'You can now download the issued certificate');
                          }, err => {
                            this.isLoading = false;
                            this.notifierService.notify('error',
                              'PKCS#12 keystore could not be generated - ' + err.error.message);
                          });
                        } else {
                          this.certificateBundle = {
                            certificate: certificate,
                            publicKey: this.toPem(rawPublicKey, 'PUBLIC KEY'),
                            privateKey: this.toPem(rawPrivateKey, 'PRIVATE KEY'),
                          };
                          this.notifierService.notify('success', 'You can now download the issued certificate');
                          this.isLoading = false;
                        }
                      }, err => {
                        this.isLoading = false;
                        this.notifierService.notify('error',
                          'Public key could not be exported - ' + err.error.message);
                      });
                    }, err => {
                      this.isLoading = false;
                      this.notifierService.notify('error',
                        'Private key could not be exported - ' + err.error.message);
                    });
                  }
                } else {
                  this.isLoading = false;
                  this.notifierService.notify('error',
                    'Error when trying to issue new certificate - ' + err.error.message);
                }
              }
            );
        });
      });
    }, err => {
      this.isLoading = false;
      this.notifierService.notify('error',
        'Error when trying to issue new certificate - ' + err.error.message);
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
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_^$#&!%';
    const values = new Uint32Array(26);
    crypto.getRandomValues(values);
    let result = '';
    for (const element of values) {
      result += charset[element % charset.length];
    }
    return result;
  }

  private async generatePKCS12(privateKey: PrivateKeyInfo, certs: Array<Certificate>, password: string)
    : Promise<ArrayBuffer> {
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
                            new BmpString({value: 'PKCS8ShroudedKeyBag from PKIjs'})
                          ]
                        }),
                        new Attribute({
                          type: '1.2.840.113549.1.9.21', // localKeyID
                          values: [
                            new OctetString({valueHex: keyLocalIDBuffer})
                          ]
                        }),
                        new Attribute({
                          type: '1.3.6.1.4.1.311.17.1', // pkcs12KeyProviderNameAttr
                          values: [
                            new BmpString({value: 'MCP using https://pkijs.org/'})
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
                            new BmpString({value: certCn})
                          ]
                        }),
                        new Attribute({
                          type: '1.2.840.113549.1.9.21', // localKeyID
                          values: [
                            new OctetString({valueHex: certLocalIDBuffer})
                          ]
                        }),
                        new Attribute({
                          type: '1.3.6.1.4.1.311.17.1', // pkcs12KeyProviderNameAttr
                          values: [
                            new BmpString({value: 'MCP using https://pkijs.org/'})
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
                            new BmpString({value: caCn})
                          ]
                        }),
                        new Attribute({
                          type: '1.2.840.113549.1.9.21', // localKeyID
                          values: [
                            new OctetString({valueHex: caCertLocalIDBuffer})
                          ]
                        }),
                        new Attribute({
                          type: '1.3.6.1.4.1.311.17.1', // pkcs12KeyProviderNameAttr
                          values: [
                            new BmpString({value: 'MCP using https://pkijs.org/'})
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

    const passwordConverted = stringToArrayBuffer(password);

    await pfx.parsedValue.authenticatedSafe.parsedValue.safeContents[0].value
      .safeBags[0].bagValue.makeInternalValues({
      password: passwordConverted,
      contentEncryptionAlgorithm: {
        name: 'AES-CBC', // OpenSSL can handle AES-CBC only
        length: 128
      },
      hmacHashAlgorithm: 'SHA-1',
      iterationCount: 100000
    });

    await pfx.parsedValue.authenticatedSafe.makeInternalValues({
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
          hmacHashAlgorithm: 'SHA-1',
          iterationCount: 100000
        }
      ]
    });

    await pfx.makeInternalValues({
      password: passwordConverted,
      iterations: 100000,
      pbkdf2HashAlgorithm: 'SHA-256',
      hmacHashAlgorithm: 'SHA-256'
    })

    return pfx.toSchema().toBER(false);
  }
}
