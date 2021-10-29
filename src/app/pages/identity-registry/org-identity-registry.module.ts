import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgIdentityRegistryRoutingModule } from './org-identity-registry-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule, NbIconModule, NbStepperModule, NbButtonModule, NbTabsetModule } from '@nebular/theme';
import { AgentsComponent } from './agents/agents.component';
import { ActingComponent } from './acting/acting.component';
import { RoleComponent } from './role/role.component';
import { ApproveOrgComponent } from './approve-org/approve-org.component';
import { ApplyOrgComponent } from './apply-org/apply-org.component';
import { IrGuideComponent } from './ir-guide/ir-guide.component';


@NgModule({
  declarations: [
    AgentsComponent,
    ActingComponent,
    RoleComponent,
    ApproveOrgComponent,
    ApplyOrgComponent,
    IrGuideComponent,
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbTabsetModule,
    NbStepperModule,
    Ng2SmartTableModule,
    OrgIdentityRegistryRoutingModule,
  ]
})
export class OrgIdentityRegistryModule { }
