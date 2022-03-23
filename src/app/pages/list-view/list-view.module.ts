import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListViewRoutingModule } from './list-view-routing.module';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbPopoverModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CertificatesComponent } from './detail/certificates/certificates.component';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { customNotifierOptions } from '../../shared/customNotifierOption';


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
    NbPopoverModule,
    Ng2SmartTableModule,
    ListViewRoutingModule,
    NotifierModule.withConfig(customNotifierOptions),
  ],
  providers: [
    NotifierService,
  ]
})
export class ListViewModule { }
