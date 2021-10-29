import { RoleComponent } from './role/role.component';
import { AgentsComponent } from './agents/agents.component';
import { ActingComponent } from './acting/acting.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgIdentityRegistryComponent } from './org-identity-registry.component';
import { NotFoundComponent } from '../miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: OrgIdentityRegistryComponent,
  children: [
    {
      path: 'devices',
      loadChildren: () => import('./entities/entities.module')
        .then(m => m.EntitiesModule),
    },
    {
      path: 'services',
      loadChildren: () => import('./entities/entities.module')
        .then(m => m.EntitiesModule),
    },
    {
      path: 'users',
      loadChildren: () => import('./entities/entities.module')
        .then(m => m.EntitiesModule),
    },
    {
      path: 'vessels',
      loadChildren: () => import('./entities/entities.module')
        .then(m => m.EntitiesModule),
    },
    {
      path: 'organizations',
      loadChildren: () => import('./entities/entities.module')
        .then(m => m.EntitiesModule),
    },
    {
      path: 'acting',
      component: ActingComponent,
    },
    {
      path: 'roles',
      component: RoleComponent,
    },
    {
      path: 'agents',
      component: AgentsComponent,
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
