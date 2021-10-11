import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationsComponent } from './organizations.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../miscellaneous/not-found/not-found.component';


const routes: Routes = [{
  path: '',
  component: OrganizationsComponent,
  children: [
    {
      path: 'list',
      component: OrganizationListComponent,
    },
    {
      path: '',
      redirectTo: 'list',
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
export class OrganizationsRoutingModule { }
