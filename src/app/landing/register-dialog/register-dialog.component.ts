/*
 * Copyright (c) 2024 Maritime Connectivity Platform Consortium
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

import { addLangs, loadLang } from './../../util/translateHelper';
import { environment } from './../../../environments/environment.test';
import { NotifierService } from 'angular-notifier';
import { Organization } from './../../backend-api/identity-registry/model/organization';
import { OrganizationControllerService } from './../../backend-api/identity-registry/api/organizationController.service';
import { AppConfig } from './../../app.config';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ColumnForResource } from '../../shared/models/columnForMenu';
import { TranslateService } from '@ngx-translate/core';

/**
 * a component for registration process
 */
@Component({
  selector: 'ngx-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {
  title = '';
  menuType = 'newOrganization';
  isForNew = true;
  environmentName: string;
  clause: string;
  agreed = false;
  submitted = false;
  termsOfUse = AppConfig.TERMS_OF_USE;

  constructor(
    protected ref: NbDialogRef<RegisterDialogComponent>,
    private organizationControllerService: OrganizationControllerService,
    private notifierService: NotifierService,
    public translate: TranslateService) {
      addLangs(translate);
      loadLang(translate);
      this.environmentName = AppConfig.ENVIRONMENT_TITLE;
  }

  ngOnInit(): void {
  }

  dismiss(): void {
    this.ref.close();
  }

  agree(): void {
    this.agreed = true;
    this.title = this.translate.instant('register.submitTitle');
  }

  approve(): void {}
  delete(): void {}
  refreshData(): void {}

  submit(value: any): void {
    const organization: Organization = {
      name: value.orgName,
      mrn: value.orgMrn,
      email: value.orgEmail,
      url: value.orgUrl,
      country: value.orgCountry,
      address: value.orgAddress,
    };
    this.organizationControllerService.applyOrganization(organization).subscribe(
      res => {
        this.submitted = true;
      },
      err => this.notifierService.notify('error', 'There was error in registration of information - ' + err.error.message),
    );
  }
}
