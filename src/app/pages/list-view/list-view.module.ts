import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListViewRoutingModule } from './list-view-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbIconModule, NbInputModule, NbPopoverModule, NbSelectModule, NbSpinnerModule, NbTabsetModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { customNotifierOptions } from '../../shared/customNotifierOption';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NbInputModule,
    NbCardModule,
    NbIconModule,
    NbSpinnerModule,
    NbTabsetModule,
    NbButtonModule,
    NbPopoverModule,
    NbSelectModule,
    ThemeModule,
    NbDatepickerModule,
    Ng2SmartTableModule,
    ListViewRoutingModule,
  ],
  providers: [
    NotifierService,
  ],
})
export class ListViewModule { }
