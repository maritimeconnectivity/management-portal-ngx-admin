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

import { langs } from './../../util/langs';
import { addLangs, changeLang, loadLang } from './../../util/translateHelper';
import { ProcessDialogComponent } from './../process-dialog/process-dialog.component';
import { RegisterDialogComponent } from './../register-dialog/register-dialog.component';
import { NotifierService } from 'angular-notifier';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { AppConfig } from '../../app.config';
import { TranslateService } from '@ngx-translate/core';

/**
 * a main landing component for login
 */
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  /**
   * value for version of the portal
   */
  version = AppConfig.MP_VERSION;
  logo_img = AppConfig.LOGO_IMG;
  environmentName = this.capitalize(AppConfig.ENVIRONMENT_NAME);
  serviceProviderName = AppConfig.MP_NAME;
  footerLink = AppConfig.FOOTER_LINK;
  footerName = AppConfig.FOOTER_NAME;
  currentLang = 'en-GB';
  selectedCountryCode = 'gb';
  countryCodes = langs.map(e => e.split('-').pop().toLowerCase());
  /**
   * environment name to show at front
   */

  constructor(
    private authService: AuthService,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    public translate: TranslateService,
  ) {
    addLangs(translate);
    this.currentLang = loadLang(translate);
    this.selectedCountryCode = this.currentLang.split('-').pop().toLowerCase();
  }

  capitalize(s: string) {
    return s[0].toUpperCase() + s.slice(1);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(e => {
      if (e['reason'] === '401') {
        this.notifierService.notify('error', 'Your session has timed out');
      } else if (e['reason'] === 'cache') {
        this.notifierService.notify(
          'error',
          'Please try to refresh your browser with CTRL-F5'
        );
      }
    });
  }

  changeLang(langName: string) {
    changeLang(this.translate, langs.filter(e => e.includes(langName.toUpperCase())).pop());
  }

  /**
   * the function activates login process
   */
  logIn() {
    this.authService.login();
  }

  /**
   * it triggers opening the registration dialog up
   */
  createRegisterDialog() {
    this.dialogService.open(RegisterDialogComponent);
  }

  /**
   * it triggers opening the process dialog up
   */
  createProcessDialog() {
    this.dialogService.open(ProcessDialogComponent);
  }
}
