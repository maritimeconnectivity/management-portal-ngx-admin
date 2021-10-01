import { NgModule } from '@angular/core';
import { NbMenuModule, NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { ApplyOrgComponent } from './apply-org/apply-org.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ApproveOrgComponent } from './approve-org/approve-org.component';

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
    AboutComponent,
    ContactComponent,
    UserGuideComponent,
    ApplyOrgComponent,
    ApproveOrgComponent,
  ],
})
export class PagesModule {
}
