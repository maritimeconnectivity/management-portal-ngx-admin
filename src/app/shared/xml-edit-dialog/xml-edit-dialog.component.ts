import { FormControl, FormGroup } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { XmlControllerService } from './../../backend-api/service-registry/api/xmlController.service';
import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { XmlDto } from '../../backend-api/service-registry';

@Component({
  selector: 'ngx-xml-edit-dialog',
  templateUrl: './xml-edit-dialog.component.html',
  styleUrls: ['./xml-edit-dialog.component.scss']
})
export class XmlEditDialogComponent implements OnInit {

  @Input() xml: XmlDto;
  @Input() isEditing: boolean;
  isValidated = false;
  formGroup: FormGroup;
  
  
  constructor(protected ref: NbDialogRef<XmlEditDialogComponent>,
    private xmlControllerService: XmlControllerService,
    private notifierService: NotifierService) { }

  ngOnInit(): void {
    if (this.xml === null) {
      this.xml = {
        name: '',
        content: '',
        comment: '',
        contentContentType: 'G1128 Instance Specification XML',
      };
    }

    this.formGroup = new FormGroup({
      name: new FormControl(),
      content: new FormControl(),
      comment: new FormControl(),
      contentContentType: new FormControl(),
    });
    this.formGroup.get('name').setValue(this.xml.name);
    this.formGroup.get('content').setValue(this.xml.content);
    this.formGroup.get('comment').setValue(this.xml.comment);
    this.formGroup.get('contentContentType').setValue(this.xml.contentContentType);
  }

  dismiss() {
    this.ref.close();
  }

  validate() {
    const xmlContent = this.formGroup.value.content;
    this.xmlControllerService.validateXmlWithG1128Schema(xmlContent, 'INSTANCE').subscribe(
      data => {
        this.notifierService.notify('success', 'XML is valid according to G1128 instance schema');
      },
      error => {
        console.log(error);
        this.notifierService.notify('error', error.message);
      },
    )
  }
}
