import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { LoginComponent } from './login/login.component';
import { LandingRoutingModule } from './landing-routing.module';
import { NgModule } from '@angular/core';
import { NbLayoutModule, NbCardModule, NbButtonModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';


@NgModule({
  declarations: [
    LandingComponent,
    LoginComponent,
    RegisterDialogComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    RouterModule,
    NbCardModule,
    NbButtonModule,
    NbLayoutModule,
    SharedModule,
  ]
})
export class LandingModule { }
