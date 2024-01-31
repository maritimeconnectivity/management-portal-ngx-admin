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

import { DocDto } from '../../backend-api/service-registry/model/docDto';
import { DocControllerService } from '../../backend-api/service-registry/api/docController.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'ngx-input-file-list',
  templateUrl: './input-file-list.component.html',
  styleUrls: ['./input-file-list.component.scss']
})
export class InputFileListComponent implements OnInit {
  @Input() docIds: number[];
  @Input() file: object;
  @Input() isEditing: boolean;
  @Input() fieldName: string;
  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() options: object[];
  @Input() instanceId: number;

  @Output() onUpdate = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

  isLoading = false;
  docDtoList: DocDto[] = [];

  constructor(
    private iconsLibrary: NbIconLibraries,
    private docControllerService: DocControllerService,
    private notifierService: NotifierService,
    ) {
    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
  }

  ngOnInit(): void {
    this.loadDocs();
  }

  downloadFile = (event: any) => {
    if (this.file && this.file['filecontent']) {
      const data = this.file['filecontent'];
      const binary = atob(data.replace(/\s/g, ''));
      const len = binary.length;
      const buffer = new ArrayBuffer(len);
      const view = new Uint8Array(buffer);
      for (var i = 0; i < len; i++) {
          view[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([view], { type: this.file['filecontentContentType'] });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.setAttribute("download", this.file['name']);
      anchor.click();
    }
  }

  loadDocs = () => {
    if (this.docIds && this.docIds.length > 0) {
      for (const docNumber of this.docIds) {
        this.docControllerService.getDoc(docNumber).subscribe(
          (docDto: DocDto) => {
            this.docDtoList.push(docDto);
          },
          err => {

          }
        )
      }
    }
  }

  deleteFileFromBackend = (docId: number) => {
    this.docControllerService.deleteDoc(docId).subscribe(
      res => {
        this.notifierService.notify('success', 'File has been successfully deleted');
        this.onDelete.emit({ fieldName: this.fieldName });
        this.isLoading = false;
      },
      err => {
        this.notifierService.notify('error', 'There was error in deletion - ' + err.error.message);
        this.isLoading = false;
      },
    );
  }

  deleteFile = (event: any) => {
    this.isLoading = true;
    if (!this.isForSingleDoc()) {
      const message = 'Are you sure you want to delete?';
      if (confirm(message)) {
        this.deleteFileFromBackend(this.file['id']);
      }
    }
    this.onDelete.emit({fieldName: this.fieldName});

    /*
    let message = 'Are you sure you want to delete?';
    if (confirm(message)) {
      this.isLoading = true;
      this.docControllerService.deleteDoc(id).subscribe(
        res => {
          this.notifierService.notify('success', 'Uploaded image has been successfully deleted');
          this.isLoading = false;
          this.items = undefined;
        },
        err => {
          this.notifierService.notify('error', 'There was error in deletion - ' + err.error.message);
          this.isLoading = false;
        },
      );
    }*/
  }

  updateFileFromBackend = (docId: number) => {
    /* Not implemented yet */
  }

  createFileFromBackend = (docDto: DocDto) => {
    this.docControllerService.createDoc(docDto).subscribe(
      (docDto: DocDto) => {
        this.isLoading = false;
        this.notifierService.notify('success', 'File has been successfully uploaded');
        if (docDto.id && this.docIds && this.docIds.indexOf(docDto.id) < 0) {
          this.docIds.push(docDto.id);
        }
        this.onUpdate.emit({ fieldName: this.fieldName, data: this.docIds});
        this.loadDocs();
      },
      err => this.notifierService.notify('error', 'There was error in updating image - ' + err.error.message),
    );
  }

  changeFile = (event: any) => {
    const [file] = event.target.files;
    const reader = new FileReader();
    this.isLoading = true;
    reader.addEventListener('load', (event:Event) => {
      const base64Data = (<any> event.target).result
        .substr((<any> event.target).result.indexOf('base64,') + 'base64,'.length);
      const loadedFile: DocDto = {
        name: file.name,
        comment: '',
        mimetype: file.type,
        filecontent: base64Data,
        filecontentContentType: file.type,
        instanceId: this.instanceId,
      };
      if (this.isForSingleDoc()) {
        this.onUpdate.emit({ fieldName: this.fieldName, data: loadedFile});
      }
      else {
        this.createFileFromBackend(loadedFile);
      }
      
    }, false);
    reader.readAsDataURL(file);
  }

  update = () => {
    this.onUpdate.emit({ data: this.docIds, fieldName: this.fieldName });
  }

  isForSingleDoc = ():boolean => {
    return this.fieldName === 'instanceAsDoc';
  }
}
