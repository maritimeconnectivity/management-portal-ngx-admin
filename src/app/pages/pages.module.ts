/*
 * Copyright (c) 2022 Maritime Connectivity Platform Consortium
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

import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { NbMenuModule, NbCardModule, NbButtonModule, NbSelectModule, NbTabsetModule, NbStepperModule, NbInputModule, NbSpinnerModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { pagesRoutingComponents, PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ListViewComponent } from './list-view/list-view.component';
import { IrGuideComponent } from './identity-registry/ir-guide/ir-guide.component';
import { SrGuideComponent } from './service-registry/sr-guide/sr-guide.component';
import { SrSearchComponent } from './service-registry/sr-search/sr-search.component';
import { SearchComponent } from './service-registry/sr-search/search/search.component';
import { InfoComponent } from './about/info/info.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbButtonModule,
    NbSelectModule,
    NbTabsetModule,
    NbStepperModule,
    NbInputModule,
    MiscellaneousModule,
    Ng2SmartTableModule,
    NbSpinnerModule,
    SharedModule,
  ],
  declarations: [
    PagesComponent,
    pagesRoutingComponents,
    ListViewComponent,
    SearchComponent,
    IrGuideComponent,
    SrGuideComponent,
    SrSearchComponent,
    InfoComponent,
  ],
})
export class PagesModule {
}
