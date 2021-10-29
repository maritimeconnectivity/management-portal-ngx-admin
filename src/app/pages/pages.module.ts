import { NgModule } from '@angular/core';
import { NbMenuModule, NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { pagesRoutingComponents, PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OrgIdentityRegistryComponent } from './identity-registry/org-identity-registry.component';
import { OrgServiceRegistryComponent } from './service-registry/org-service-registry.component';
import { BugReportComponent } from './bug-report/bug-report.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    PagesComponent,
    pagesRoutingComponents,
    OrgIdentityRegistryComponent,
    OrgServiceRegistryComponent,
    BugReportComponent,
  ],
})
export class PagesModule {
}
