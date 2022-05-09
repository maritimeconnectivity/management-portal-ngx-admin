import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { LoginComponent } from './login/login.component';
import { LandingRoutingModule } from './landing-routing.module';
import { NgModule } from '@angular/core';
import { NbLayoutModule, NbCardModule, NbButtonModule, NbStepperModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { ProcessDialogComponent } from './process-dialog/process-dialog.component';


@NgModule({
  declarations: [
    LandingComponent,
    LoginComponent,
    RegisterDialogComponent,
    ProcessDialogComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    RouterModule,
    NbCardModule,
    NbButtonModule,
    NbLayoutModule,
    SharedModule,
    NbStepperModule,
  ]
})
export class LandingModule { }
