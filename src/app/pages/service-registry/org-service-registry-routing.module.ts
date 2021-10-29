import { ApproveSvcComponent } from './approve-svc/approve-svc.component';
import { ApplySvcComponent } from './apply-svc/apply-svc.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../miscellaneous/not-found/not-found.component';
import { OrgServiceRegistryComponent } from './org-service-registry.component';
import { SrGuideComponent } from './sr-guide/sr-guide.component';

const routes: Routes = [{
  path: '',
  component: OrgServiceRegistryComponent,
  children: [
    {
      path: 'instances',
      loadChildren: () => import('./instances/instances.module')
        .then(m => m.InstancesModule),
    },
    {
      path: 'apply-svc',
      component: ApplySvcComponent,
    },
    {
      path: 'approve-svc',
      component: ApproveSvcComponent,
    },
    {
      path: 'guide',
      component: SrGuideComponent,
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
export class OrgServiceRegistryRoutingModule { }
