import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListViewRoutingModule } from './list-view-routing.module';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CertificatesComponent } from './detail/certificates/certificates.component';


@NgModule({
  declarations: [
    EditComponent,
    ListComponent,
    DetailComponent,
    CertificatesComponent,
  ],
  imports: [
    CommonModule,
    NbInputModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    Ng2SmartTableModule,
    ListViewRoutingModule,
  ]
})
export class ListViewModule { }
