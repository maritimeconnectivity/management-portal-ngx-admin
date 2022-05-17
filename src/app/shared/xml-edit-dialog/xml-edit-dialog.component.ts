import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-xml-edit-dialog',
  templateUrl: './xml-edit-dialog.component.html',
  styleUrls: ['./xml-edit-dialog.component.scss']
})
export class XmlEditDialogComponent implements OnInit {

  @Input() xml: object;
  isEditing = false;
  isValidated = false;
  
  constructor(protected ref: NbDialogRef<XmlEditDialogComponent>) { }

  ngOnInit(): void {
    console.log(this.xml);
  }

  dismiss() {
    this.ref.close();
  }
}
