import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { EntitiesComponent } from './entities.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntitiesRoutingModule } from './entities-routing.module';
import { ListComponent } from './list/list.component';
import { NbCardModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CertificatesComponent } from './detail/certificates/certificates.component';


@NgModule({
  declarations: [
    EntitiesComponent,
    ListComponent,
    EditComponent,
    DetailComponent,
    CertificatesComponent,
  ],
  imports: [
    CommonModule,
    NbCardModule,
    Ng2SmartTableModule,
    EntitiesRoutingModule,
  ]
})
export class EntitiesModule { }
