import { SrSearchComponent } from './service-registry/sr-search/sr-search.component';
import { IrGuideComponent } from './identity-registry/ir-guide/ir-guide.component';
import { BugReportComponent } from './bug-report/bug-report.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import { SrGuideComponent } from './service-registry/sr-guide/sr-guide.component';
import { AuthGuard } from '../auth/app.guard';

const routes: Routes = [
  {
  path: '',
  component: PagesComponent,
  canActivate: [AuthGuard],
  children: [
    // identity registry
    {
      path: 'ir/devices',
      loadChildren: () => import('./list-view/list-view.module')
        .then(m => m.ListViewModule),
    },
    {
      path: 'ir/services',
      loadChildren: () => import('./list-view/list-view.module')
        .then(m => m.ListViewModule),
    },
    {
      path: 'ir/users',
      loadChildren: () => import('./list-view/list-view.module')
        .then(m => m.ListViewModule),
    },
    {
      path: 'ir/vessels',
      loadChildren: () => import('./list-view/list-view.module')
        .then(m => m.ListViewModule),
    },
    {
      path: 'ir/organizations',
      loadChildren: () => import('./list-view/list-view.module')
        .then(m => m.ListViewModule),
    },
    {
      path: 'ir/apply-org',
      loadChildren: () => import('./list-view/list-view.module')
        .then(m => m.ListViewModule),
    },
    {
      path: 'ir/orgcandidates',
      loadChildren: () => import('./list-view/list-view.module')
        .then(m => m.ListViewModule),
    },
    {
      path: 'ir/acting',
      loadChildren: () => import('./list-view/list-view.module')
        .then(m => m.ListViewModule),
    },
    {
      path: 'ir/roles',
      loadChildren: () => import('./list-view/list-view.module')
        .then(m => m.ListViewModule),
    },
    {
      path: 'ir/agents',
      loadChildren: () => import('./list-view/list-view.module')
        .then(m => m.ListViewModule),
    },
    {
      path: 'ir/guide',
      component: IrGuideComponent,
    },
    // service registry
    {
      path: 'sr/instances',
      loadChildren: () => import('./list-view/list-view.module')
        .then(m => m.ListViewModule),
    },
    {
      path: 'sr/instanceorg',
      loadChildren: () => import('./list-view/list-view.module')
        .then(m => m.ListViewModule),
    },
    {
      path: 'sr/approve-svc',
      loadChildren: () => import('./list-view/list-view.module')
        .then(m => m.ListViewModule),
    },
    {
      path: 'sr/search',
      component: SrSearchComponent,
    },
    {
      path: 'sr/guide',
      component: SrGuideComponent,
    },
    {
      path: 'about',
      component: AboutComponent,
    },
    {
      path: 'contact',
      component: ContactComponent,
    },
    {
      path: 'bug-report',
      component: BugReportComponent,
    },
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
export const pagesRoutingComponents = [
  AboutComponent,
  ContactComponent,
];