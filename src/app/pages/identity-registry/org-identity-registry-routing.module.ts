import { ListViewModule } from './../list-view/list-view.module';
import { IrGuideComponent } from './ir-guide/ir-guide.component';

import { AgentsComponent } from './agents/agents.component';
import { ActingComponent } from './acting/acting.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgIdentityRegistryComponent } from './org-identity-registry.component';
import { NotFoundComponent } from '../miscellaneous/not-found/not-found.component';
import { ApplyOrgComponent } from './apply-org/apply-org.component';
import { ApproveOrgComponent } from './approve-org/approve-org.component';

const routes: Routes = [{
  path: '',
  component: OrgIdentityRegistryComponent,
  children: [
    {
      path: 'apply-org',
      component: ApplyOrgComponent,
    },
    {
      path: 'guide',
      component: IrGuideComponent,
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgIdentityRegistryRoutingModule { }
