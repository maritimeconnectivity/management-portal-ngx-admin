import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgIdentityRegistryRoutingModule } from './org-identity-registry-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule, NbIconModule } from '@nebular/theme';
import { AgentsComponent } from './agents/agents.component';
import { ActingComponent } from './acting/acting.component';
import { RoleComponent } from './role/role.component';


@NgModule({
  declarations: [
    AgentsComponent,
    ActingComponent,
    RoleComponent,
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbIconModule,
    Ng2SmartTableModule,
    OrgIdentityRegistryRoutingModule,
  ]
})
export class OrgIdentityRegistryModule { }
