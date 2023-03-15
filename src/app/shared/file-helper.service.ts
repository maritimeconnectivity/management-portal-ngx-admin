/*
 * Copyright (c) 2023 Maritime Connectivity Platform Consortium
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
      const nameNoSpaces = entityName.split(' ').join('_');

      const certificate = serverGeneratedKeys ?
        this.replaceNewLines(certificateBundle.pemCertificate.certificate)
        : certificateBundle.pemCertificate.certificate;
      const publicKey = serverGeneratedKeys ?
        this.replaceNewLines(certificateBundle.pemCertificate.publicKey)
        : certificateBundle.pemCertificate.publicKey;
      const privateKey = serverGeneratedKeys ?
        this.replaceNewLines(certificateBundle.pemCertificate.privateKey)
        : certificateBundle.pemCertificate.privateKey;
      const pkcs12Keystore = certificateBundle.pkcs12Keystore && typeof(certificateBundle.pkcs12Keystore) === 'string' ?
        this.convertBase64ToByteArray(certificateBundle.pkcs12Keystore) as ArrayBuffer
        : certificateBundle.pkcs12Keystore;

      const zip = new JSZip();
      zip.file("Certificate_" + nameNoSpaces + ".pem", certificate);
      if (privateKey) {
        zip.file("PrivateKey_" + nameNoSpaces + ".pem", privateKey);
      }
      if (publicKey) {
        zip.file("PublicKey_" + nameNoSpaces + ".pem", publicKey);
      }
      if (certificateBundle.keystorePassword) {
        zip.file("KeystorePassword.txt", this.replaceNewLines(certificateBundle.keystorePassword));
      }
      if (certificateBundle.jksKeystore) {
        const jksByteArray = this.convertBase64ToByteArray(certificateBundle.jksKeystore);
        const blob = new Blob([jksByteArray]);
        zip.file("Keystore_" + nameNoSpaces + ".jks", blob);
      }
      if (pkcs12Keystore) {
        const p12ByteArray = pkcs12Keystore;
        const blob = new Blob([p12ByteArray]);
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
