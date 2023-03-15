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

import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { AppConfig } from '../app.config';
import { PermissionResolver } from '../auth/auth.permission';
import { AuthService } from '../auth/auth.service';
import { Organization, OrganizationControllerService } from '../backend-api/identity-registry';
import { addLangs, applyTranslateToMenu, applyTranslateToSingleMenu, loadLang } from '../util/translateHelper';

import { MENU_ITEMS, MIR_MENU_FOR_ADMIN, MIR_MENU_FOR_ORG, MSR_MENU_FOR_ORG } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  menu = MENU_ITEMS;

  myOrganizationName: string;
  myOrganizationMrn: string;
  keycloakMSRPermissions: any;
  MIRPermission: any;

  constructor(
    private organizationControllerService: OrganizationControllerService,
    private notifierService: NotifierService,
    private authService: AuthService,
    public translate: TranslateService,
    ) {
      addLangs(translate);
      loadLang(translate);

    if (!AppConfig.HAS_SERVICE_REGISTRY) {
      this.menu = this.menu.filter(e => e.title !== 'menu.sr');
    }
    if (!AppConfig.HAS_MSR_LEDGER) {
      this.menu = this.menu.filter(e => e.title !== 'menu.ledger');
    }

    applyTranslateToMenu(translate, this.menu);
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit(): void {
    if (!this.myOrganizationName) {
      this.organizationControllerService.getOrganization1(this.authService.authState.orgMrn).subscribe(
        (org: Organization) => {
          this.authService.updateOrgName(org.name);
          this.myOrganizationName = org.name;
          this.myOrganizationMrn = org.mrn;

          if (this.authService.authState.rolesLoaded) {
            this.applyRoleToMenu();
          } else {
            this.authService.rolesLoaded.subscribe( () => this.applyRoleToMenu());
          }
        },
        (error: HttpErrorResponse) => this.notifierService.notify('error', error.message),
      )
    }
  }

  applyRoleToMenu = () => {
    this.keycloakMSRPermissions =
      this.authService.authState.user ? this.authService.authState.user.keycloakMSRPermissions : undefined;
    this.MIRPermission = this.authService.authState.permission ? this.authService.authState.permission : undefined;
    this.assignOrganizationNameForMIR();
    this.assignAdminMenu();
    if (AppConfig.HAS_SERVICE_REGISTRY){
      this.assignOrganizationNameForMSR();
    }
  }

  assignOrganizationNameForMIR = () => {
    if (!this.menu.find(e => e.title === this.translate.instant('menu.ir')) ||
      this.menu.find(e => e.title === this.translate.instant('menu.ir')).children.find(e => e.title === MIR_MENU_FOR_ORG.title)) {
      return ;
    }
    if (this.myOrganizationName && this.myOrganizationMrn) {
      MIR_MENU_FOR_ORG.title = this.myOrganizationName;
      MIR_MENU_FOR_ORG.children.unshift({
        title: this.translate.instant('menu.ir.org.info'),
        link: 'ir/organizations/' + encodeURIComponent(this.myOrganizationMrn),
      });
      // apply translate
      applyTranslateToSingleMenu(this.translate, MIR_MENU_FOR_ORG);
      this.menu.find(e => e.title === this.translate.instant('menu.ir')).children.unshift(MIR_MENU_FOR_ORG);
    }
  }

  assignOrganizationNameForMSR = () => {
    if (!this.menu.find(e => e.title === this.translate.instant('menu.sr')) ||
      this.menu.find(e => e.title === this.translate.instant('menu.sr'))
      .children.find(e => e.title === MSR_MENU_FOR_ORG.title)) {
      return ;
    }
    if (this.myOrganizationName && this.keycloakMSRPermissions) {
      if (PermissionResolver.isOrgServiceAdmin(this.keycloakMSRPermissions)) {
        MSR_MENU_FOR_ORG.title = this.myOrganizationName;
        // apply translate
        applyTranslateToSingleMenu(this.translate, MSR_MENU_FOR_ORG);
        this.menu.find(e => e.title === this.translate.instant('menu.sr')).children.unshift(MSR_MENU_FOR_ORG);
      }
    }
  }

  assignAdminMenu = () => {
    if (!this.menu.find(e => e.title === this.translate.instant('menu.ir')) ||
      this.menu.find(e => e.title === this.translate.instant('menu.ir'))
      .children.find(e => e.title === MIR_MENU_FOR_ADMIN.title)) {
      return ;
    }
    if (this.MIRPermission && PermissionResolver.canApproveOrg(this.MIRPermission)) {
      this.menu.find(e => e.title === this.translate.instant('menu.ir')).children.unshift(MIR_MENU_FOR_ADMIN);
      MIR_MENU_FOR_ADMIN.title = this.translate.instant('menu.ir.admin');
    }
  }
}
