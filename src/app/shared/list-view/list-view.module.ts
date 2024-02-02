/*
 * Copyright (c) 2024 Maritime Connectivity Platform Consortium
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

import { SharedModule } from '../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListViewRoutingModule } from './list-view-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbIconModule, NbInputModule, NbPopoverModule, NbSelectModule, NbSpinnerModule, NbTabsetModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NotifierService } from 'angular-notifier';
import { ThemeModule } from '../../@theme/theme.module';
import { DetailModalComponent } from './detail-modal/detail-modal.component';

@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    DetailModalComponent,
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
