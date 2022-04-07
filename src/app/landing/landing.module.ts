import { LandingComponent } from './landing.component';
import { LoginComponent } from './login/login.component';
import { LandingRoutingModule } from './landing-routing.module';
import { NgModule } from '@angular/core';
import { NbLayoutModule, NbCardModule, NbButtonModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LandingComponent,
    LoginComponent,
  ],
  imports: [
    LandingRoutingModule,
    RouterModule,
    NbCardModule,
    NbButtonModule,
    NbLayoutModule,
  ]
})
export class LandingModule { }
