import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationsComponent } from './organizations.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule } from '@nebular/theme';


@NgModule({
  declarations: [
    OrganizationsComponent,
    OrganizationListComponent,
  ],
  imports: [
    CommonModule,
    NbCardModule,
    Ng2SmartTableModule,
    OrganizationsRoutingModule,
  ]
})
export class OrganizationsModule { }
