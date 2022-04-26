import { NbCardModule, NbSpinnerModule, NbButtonModule, NbIconModule, NbDatepickerModule, NbSelectModule, NbInputModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableFormComponent } from './editable-form/editable-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CertificatesComponent } from './certificates/certificates.component';
import { CertIssueDialogComponent } from './certificates/cert-issue-dialog/cert-issue-dialog.component';
import { CertRevokeDialogComponent } from './certificates/cert-revoke-dialog/cert-revoke-dialog.component';

@NgModule({
  declarations: [
    EditableFormComponent,
    CertificatesComponent,
    CertIssueDialogComponent,
    CertRevokeDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NbCardModule,
    NbSpinnerModule,
    NbButtonModule,
    NbIconModule,
    NbDatepickerModule,
    NbSelectModule,
    NbInputModule,
    Ng2SmartTableModule,
  ],
  exports: [
    EditableFormComponent,
  ]
})
export class SharedModule { }
