/*
 * Copyright (c) 2023 Maritime Connectivity Platform Consortium
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { httpTranslateLoader } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { NgxFlagPickerModule } from 'ngx-flag-picker';

/**
 * a module for landing process
 */
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
    SharedModule,
    NbCardModule,
    NbButtonModule,
    NbLayoutModule,
    NbStepperModule,
    NgxFlagPickerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      }
    }),
  ]
})
export class LandingModule { }
