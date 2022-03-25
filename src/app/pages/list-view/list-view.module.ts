import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListViewRoutingModule } from './list-view-routing.module';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbIconModule, NbInputModule, NbPopoverModule, NbSelectModule, NbTabsetModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CertificatesComponent } from './detail/certificates/certificates.component';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { customNotifierOptions } from '../../shared/customNotifierOption';
import { CertIssueDialogComponent } from './detail/certificates/cert-issue-dialog/cert-issue-dialog.component';
import { CertRevokeDialogComponent } from './detail/certificates/cert-revoke-dialog/cert-revoke-dialog.component';


@NgModule({
  declarations: [
    EditComponent,
    ListComponent,
    DetailComponent,
    CertificatesComponent,
    CertIssueDialogComponent,
    CertRevokeDialogComponent,
  ],
  imports: [
    CommonModule,
    NbInputModule,
    NbCardModule,
    NbIconModule,
    NbTabsetModule,
    NbButtonModule,
    NbPopoverModule,
    NbSelectModule,
    NbDatepickerModule,
    Ng2SmartTableModule,
    ListViewRoutingModule,
    NotifierModule.withConfig(customNotifierOptions),
  ],
  providers: [
    NotifierService,
  ],
})
export class ListViewModule { }
