/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LandingModule } from './landing/landing.module';
import { ApiModule as MIRApiModule } from './backend-api/identity-registry';
import { ApiModule as MSRApiModule } from './backend-api/service-registry';
import { ApiModule as SECOMApiModule } from './backend-api/secom';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NotifierModule } from 'angular-notifier';
import { customNotifierOptions } from './shared/customNotifierOption';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MIRApiModule,
    MSRApiModule,
    SECOMApiModule,
    AuthModule,
    LandingModule,
    RouterModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      }
    }),
    NotifierModule.withConfig(customNotifierOptions),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}