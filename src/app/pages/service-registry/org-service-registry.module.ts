import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgServiceRegistryRoutingModule } from './org-service-registry-routing.module';
import { InstancesComponent } from './instances/instances.component';
import { ApplySvcComponent } from './apply-svc/apply-svc.component';
import { ApproveSvcComponent } from './approve-svc/approve-svc.component';
import { SrGuideComponent } from './sr-guide/sr-guide.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbStepperModule, NbTabsetModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [
    InstancesComponent,
    ApplySvcComponent,
    ApproveSvcComponent,
    SrGuideComponent,
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbTabsetModule,
    NbStepperModule,
    Ng2SmartTableModule,
    OrgServiceRegistryRoutingModule,
  ]
})
export class OrgServiceRegistryModule { }
