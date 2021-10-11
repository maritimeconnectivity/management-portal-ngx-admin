import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgIdentityRegistryRoutingModule } from './org-identity-registry-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule } from '@nebular/theme';
import { AgentsComponent } from './agents/agents.component';
import { ActingComponent } from './acting/acting.component';
import { RolesComponent } from './roles/roles.component';


@NgModule({
  declarations: [
    AgentsComponent,
    ActingComponent,
    RolesComponent,
  ],
  imports: [
    CommonModule,
    NbCardModule,
    Ng2SmartTableModule,
    OrgIdentityRegistryRoutingModule,
  ]
})
export class OrgIdentityRegistryModule { }
