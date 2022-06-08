import { DocDto } from '../backend-api/service-registry';
import { XmlDto } from '../backend-api/service-registry';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import * as fileSaver from "file-saver";
import * as JSZip from 'jszip';
import { CertificateBundle } from '../backend-api/identity-registry';

@Injectable({
  providedIn: 'root'
})
export class FileHelperService {
  constructor() {

  }

  public downloadPemCertificate(certificateBundle: CertificateBundle, entityName: string,
                                serverGeneratedKeys: boolean, notifierService: NotifierService) {
    try {
      let nameNoSpaces = entityName.split(' ').join('_');
      if (serverGeneratedKeys) {
        certificateBundle.pemCertificate.certificate = this.replaceNewLines(certificateBundle.pemCertificate.certificate);
        if (certificateBundle.pemCertificate.publicKey)
          certificateBundle.pemCertificate.publicKey = this.replaceNewLines(certificateBundle.pemCertificate.publicKey);
        if (certificateBundle.pemCertificate.privateKey)
          certificateBundle.pemCertificate.privateKey = this.replaceNewLines(certificateBundle.pemCertificate.privateKey);
        if (certificateBundle.pkcs12Keystore && typeof(certificateBundle.pkcs12Keystore) === 'string')
          certificateBundle.pkcs12Keystore = this.convertBase64ToByteArray(certificateBundle.pkcs12Keystore) as ArrayBuffer;
      }
      let zip = new JSZip();
      zip.file("Certificate_" + nameNoSpaces + ".pem", certificateBundle.pemCertificate.certificate);
      if (certificateBundle.pemCertificate.privateKey) {
        zip.file("PrivateKey_" + nameNoSpaces + ".pem", certificateBundle.pemCertificate.privateKey);
      }
      if (certificateBundle.pemCertificate.publicKey) {
        zip.file("PublicKey_" + nameNoSpaces + ".pem", certificateBundle.pemCertificate.publicKey);
      }
      if (certificateBundle.keystorePassword) {
        zip.file("KeystorePassword.txt", this.replaceNewLines(certificateBundle.keystorePassword));
      }
      if (certificateBundle.jksKeystore) {
        let jksByteArray = this.convertBase64ToByteArray(certificateBundle.jksKeystore);
        let blob = new Blob([jksByteArray]);
        zip.file("Keystore_" + nameNoSpaces + ".jks", blob);
      }
      if (certificateBundle.pkcs12Keystore) {
        let p12ByteArray = certificateBundle.pkcs12Keystore;
        let blob = new Blob([p12ByteArray]);
        zip.file("Keystore_" + nameNoSpaces + ".p12", blob);
      }
      zip.generateAsync({type:"blob"}).then(function (content) {
        fileSaver.saveAs(content, "Certificate_" + nameNoSpaces + ".zip");
      });
    } catch ( error ) {
      notifierService.notify('error', 'Error when trying to download file - ' + error);
    }
  }

  public downloadXml(xmlFile:XmlDto, notifierService: NotifierService):void {
    if (!xmlFile) {
      notifierService.notify('error', 'No file to download');
      return;
    }
    let fileContent = xmlFile.content;

    let fileName = xmlFile.name;
    let fileType = xmlFile.contentContentType;
    this.downloadFile(fileContent, fileType, fileName, notifierService);
  }

  public downloadDoc(docFile:DocDto, notifierService: NotifierService):void {
    if (!docFile) {
      notifierService.notify('error', 'No file to download');
      return;
    }
    // TODO: I belive it is wrong that "content" is an array of strings. Please be wary of this may change in the future
    if (docFile.filecontent.length > 1 && docFile.filecontent.length < 10) {
      notifierService.notify('error', 'File from Service Registry is in the wrong format. ' + docFile.name);
      return;
    }
    let fileContent = docFile.filecontent.toString();

    let fileName = docFile.name;
    let fileType = docFile.filecontentContentType;
    this.downloadBase64File(fileContent, fileType, fileName, notifierService);
  }

  public downloadBase64File(base64Content:string, fileType:string, fileName:string, notifierService: NotifierService):void {
    try {
      let byteArray = this.convertBase64ToByteArray(base64Content);

      let blob = new Blob([byteArray], {type: fileType});
      fileSaver.saveAs(blob, fileName);
    } catch ( error ) {
      notifierService.notify('error', 'Error when trying to download file - ' + error);
    }
  }

  public downloadFile(content:string, fileType:string, fileName:string, notifierService: NotifierService):void {
    try {
      let blob = new Blob([content], {type: fileType});
      fileSaver.saveAs(blob, fileName);
    } catch ( error ) {
      notifierService.notify('error', 'Error when trying to download file - ' + error);
    }
  }

  private convertBase64ToByteArray(base64Content: string): Uint8Array {
    let byteCharacters  = window.atob(base64Content);
    let byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    return new Uint8Array(byteNumbers);
  }

  private replaceNewLines(stringToReplace: string) {
    let replaceString = "\n";
    if (navigator.appVersion.indexOf("Win")!=-1){
      replaceString = "\r\n";
    }
    return (!stringToReplace) ? '' : stringToReplace.replace(/(\\n)/gm, replaceString);
  }
}
