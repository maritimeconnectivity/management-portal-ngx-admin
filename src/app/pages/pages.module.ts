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
import { MapComponent } from './service-registry/sr-search/map/map.component';
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
  ],
  declarations: [
    PagesComponent,
    pagesRoutingComponents,
    ListViewComponent,
    MapComponent,
    SearchComponent,
    IrGuideComponent,
    SrGuideComponent,
    SrSearchComponent,
    InfoComponent,
  ],
})
export class PagesModule {
}
