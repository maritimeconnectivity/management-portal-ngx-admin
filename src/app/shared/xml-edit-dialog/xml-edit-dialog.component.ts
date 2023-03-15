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

import { FormControl, FormGroup } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { XmlDto } from '../../backend-api/service-registry';
import { XmlControllerService } from '../../backend-api/service-registry/api/xmlController.service';

@Component({
  selector: 'ngx-xml-edit-dialog',
  templateUrl: './xml-edit-dialog.component.html',
  styleUrls: ['./xml-edit-dialog.component.scss']
})
export class XmlEditDialogComponent implements OnInit {

  @Input() xml: XmlDto;
  @Input() isEditing: boolean;
  @Input() onUpdate: (xml: XmlDto) => void;
  //@Output() onUpdate = new EventEmitter<FormGroup>();
  
  isValidated = false;
  formGroup: FormGroup;
  initialXml: XmlDto = {
    id: 0,
    name: '',
    content: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<serviceInstance xmlns="http://iala-aism.org/g1128/v1.3/ServiceInstanceSchema.xsd" xmlns:ns2="http://iala-aism.org/g1128/v1.3/ServiceSpecificationSchema.xsd">\n</serviceInstance>',
    comment: '',
    contentContentType: 'G1128 Instance Specification XML',
  };
  
  constructor(protected ref: NbDialogRef<XmlEditDialogComponent>,
    private xmlControllerService: XmlControllerService,
    private notifierService: NotifierService,
    private dialogService: NbDialogService) { }

  ngOnInit(): void {
    if (this.xml) {
      this.initialXml = this.xml;
    }

    this.formGroup = new FormGroup({
      name: new FormControl(),
      content: new FormControl(),
      comment: new FormControl(),
      contentContentType: new FormControl(),
    });

    if (this.xml) {
      this.formGroup.get('name').setValue(this.xml.name);
      this.formGroup.get('content').setValue(this.xml.content);
      this.formGroup.get('comment').setValue(this.xml.comment);
      this.formGroup.get('contentContentType').setValue(this.xml.contentContentType);
    }
  }

  isThereAnyDifference(initial: XmlDto, current: XmlDto) {
    return Object.entries(current).filter(e => current[e[0]] !== e[1]).length > 0;
  }

  dismiss() {
    if (this.isEditing && this.isThereAnyDifference(this.initialXml, this.formGroup.value)) {
      this.ref.close();
    } else {
      this.ref.close();
    }
  }

  validate() {
    const xmlContent = this.formGroup.value.content;
    this.xmlControllerService.validateXmlWithG1128Schema(xmlContent, 'INSTANCE').subscribe(
      data => {
        this.isValidated = true;
        this.notifierService.notify('success', 'XML is valid according to G1128 instance schema');
      },
      error => {
        this.isValidated = false;
        this.notifierService.notify('error', error.message);
      },
    );
  }

  getFormValue() {
    const data = {id: this.initialXml.id};
    return Object.assign({}, data, this.formGroup.value);
  }

  save() {
    this.onUpdate(this.getFormValue());
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });
  }
}
