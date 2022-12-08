import { LedgerGuideComponent } from './msr-ledger/ledger-guide/ledger-guide.component';
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

import { MsrLedgerSearchComponent } from './msr-ledger/msr-ledger-search/msr-ledger-search.component';
import { SrSearchComponent } from './service-registry/sr-search/sr-search.component';
import { IrGuideComponent } from './identity-registry/ir-guide/ir-guide.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import {AboutComponent} from './about/about.component';
import { SrGuideComponent } from './service-registry/sr-guide/sr-guide.component';
import { AuthGuard } from '../auth/app.guard';

/**
 * routes for pages
 */
const routes: Routes = [
  {
  path: '',
  component: PagesComponent,
  canActivate: [AuthGuard],
  children: [
    // identity registry
    {
      path: 'ir/devices',
      loadChildren: () => import('../shared/list-view/list-view.module')
        .then(m => m.ListViewModule),
    },
    {
      path: 'ir/services',
      loadChildren: () => import('../shared/list-view/list-view.module')
        .then(m => m.ListViewModule),
    },
    {
      path: 'ir/users',
      loadChildren: () => import('../shared/list-view/list-view.module')
        .then(m => m.ListViewModule),
    },
    {
      path: 'ir/vessels',
      loadChildren: () => import('../shared/list-view/list-view.module')
        .then(m => m.ListViewModule),
    },
    {
      path: 'ir/organizations',
      loadChildren: () => import('../shared/list-view/list-view.module')
        .then(m => m.ListViewModule),
    },
    {
      path: 'ir/apply-org',
      loadChildren: () => import('../shared/list-view/list-view.module')
        .then(m => m.ListViewModule),
    },
    {
      path: 'ir/orgcandidates',
      loadChildren: () => import('../shared/list-view/list-view.module')
        .then(m => m.ListViewModule),
    },
    {
      path: 'ir/acting',
      loadChildren: () => import('../shared/list-view/list-view.module')
        .then(m => m.ListViewModule),
    },
    {
      path: 'ir/roles',
      loadChildren: () => import('../shared/list-view/list-view.module')
        .then(m => m.ListViewModule),
    },
    {
      path: 'ir/agents',
      loadChildren: () => import('../shared/list-view/list-view.module')
        .then(m => m.ListViewModule),
    },
    {
      path: 'ir/guide',
      component: IrGuideComponent,
    },
    // service registry
    {
      path: 'sr/instances',
      loadChildren: () => import('../shared/list-view/list-view.module')
        .then(m => m.ListViewModule),
    },
    {
      path: 'sr/instanceorg',
      loadChildren: () => import('../shared/list-view/list-view.module')
        .then(m => m.ListViewModule),
    },
    {
      path: 'sr/approve-svc',
      loadChildren: () => import('../shared/list-view/list-view.module')
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
      path: 'ledger/search',
      component: MsrLedgerSearchComponent,
    },
    {
      path: 'ledger/ledgerInstance',
      loadChildren: () => import('../shared/list-view/list-view.module')
        .then(m => m.ListViewModule),
    },
    {
      path: 'ledger/guide',
      component: LedgerGuideComponent,
    },
    {
      path: 'about',
      component: AboutComponent,
    },
    {
      path: '',
      redirectTo: 'ir/guide',
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
];
