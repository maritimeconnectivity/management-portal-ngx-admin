import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-cert-issue-dialog',
  templateUrl: './cert-issue-dialog.component.html',
  styleUrls: ['./cert-issue-dialog.component.scss']
})
export class CertIssueDialogComponent{

  @Input() title: string;
  @Input() isChoiceStep: boolean;

  constructor(protected ref: NbDialogRef<CertIssueDialogComponent>) {}

  dismiss() {
    this.ref.close();
  }
}