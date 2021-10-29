import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../miscellaneous/not-found/not-found.component';
import { OrgServiceRegistryComponent } from './org-service-registry.component';


const routes: Routes = [{
  path: '',
  component: OrgServiceRegistryComponent,
  children: [
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
