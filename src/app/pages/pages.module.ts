import { NgModule } from '@angular/core';
import { NbMenuModule, NbCardModule, NbButtonModule, NbSelectComponent, NbSelectModule, NbTabsetModule, NbStepperModule, NbInputModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { pagesRoutingComponents, PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BugReportComponent } from './bug-report/bug-report.component';
import { ListViewComponent } from './list-view/list-view.component';
import { IrGuideComponent } from './identity-registry/ir-guide/ir-guide.component';
import { SrGuideComponent } from './service-registry/sr-guide/sr-guide.component';
import { SrSearchComponent } from './service-registry/sr-search/sr-search.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './service-registry/sr-search/map/map.component';
import { SearchComponent } from './service-registry/sr-search/search/search.component';
import { IrInfoComponent } from './about/ir-info/ir-info.component';
import { SrInfoComponent } from './about/sr-info/sr-info.component';
import { PortalInfoComponent } from './about/portal-info/portal-info.component';

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
    DashboardModule,
    ECommerceModule,
    LeafletModule.forRoot(),
    MiscellaneousModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    PagesComponent,
    pagesRoutingComponents,
    BugReportComponent,
    ListViewComponent,
    MapComponent,
    SearchComponent,
    IrGuideComponent,
    SrGuideComponent,
    SrSearchComponent,
    IrInfoComponent,
    SrInfoComponent,
    PortalInfoComponent,
  ],
})
export class PagesModule {
}
