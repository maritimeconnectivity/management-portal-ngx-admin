/*
 * Copyright (c) 2022 Maritime Connectivity Platform Consortium
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

import { AuthService } from './../auth/auth.service';
import { NotifierService } from 'angular-notifier';
import { Organization } from './../backend-api/identity-registry/model/organization';
import { OrganizationControllerService } from './../backend-api/identity-registry/api/organizationController.service';
import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS, MIR_MENU_FOR_ADMIN, MIR_MENU_FOR_ORG, MSR_MENU_FOR_ORG} from './pages-menu';
import { PermissionResolver } from '../auth/auth.permission';
import { HttpErrorResponse } from '@angular/common/http';
import { AppConfig } from '../app.config';

/**
 * a core components for showing pages
 */
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
export class PagesComponent implements OnInit {
  menu = MENU_ITEMS;

  myOrganizationName: string;
  myOrganizationMrn: string;
  keycloakMSRPermissions: any;
  MIRPermission: any;

  constructor(
    private organizationControllerService: OrganizationControllerService,
    private notifierService: NotifierService,
    private authService: AuthService,
    ) {
    if (!AppConfig.HAS_SERVICE_REGISTRY) {
      this.menu = this.menu.filter(e => e.title !== 'Service Registry');
    }
    if (!AppConfig.HAS_MSR_LEDGER) {
      this.menu = this.menu.filter(e => e.title !== 'Global Service Discovery');
    }
  }

  ngOnInit(): void {
    if (!this.myOrganizationName) {
      this.organizationControllerService.getOrganizationByMrn(this.authService.authState.orgMrn).subscribe(
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
    if (this.menu.find(e => e.title === 'Identity Registry').children.find(e => e.title === MIR_MENU_FOR_ORG.title)) {
      return ;
    }
    if (this.myOrganizationName && this.myOrganizationMrn) {
      MIR_MENU_FOR_ORG.title = this.myOrganizationName;
      MIR_MENU_FOR_ORG.children.unshift({
        title: 'Info',
        link: 'ir/organizations/' + encodeURIComponent(this.myOrganizationMrn),
      });
      this.menu.find(e => e.title === 'Identity Registry').children.unshift(MIR_MENU_FOR_ORG);
    }
  }

  assignOrganizationNameForMSR = () => {
    if (this.menu.find(e => e.title === 'Service Registry').children.find(e => e.title === MSR_MENU_FOR_ORG.title)) {
      return ;
    }
    if (this.myOrganizationName && this.keycloakMSRPermissions) {
      if (PermissionResolver.isOrgServiceAdmin(this.keycloakMSRPermissions)) {
        MSR_MENU_FOR_ORG.title = this.myOrganizationName;
        this.menu.find(e => e.title === 'Service Registry').children.unshift(MSR_MENU_FOR_ORG);
      }
    }
  }

  assignAdminMenu = () => {
    if (this.menu.find(e => e.title === 'Identity Registry').children.find(e => e.title === MIR_MENU_FOR_ADMIN.title)) {
      return ;
    }
    if (this.MIRPermission && PermissionResolver.canApproveOrg(this.MIRPermission)) {
      this.menu.find(e => e.title === 'Identity Registry').children.unshift(MIR_MENU_FOR_ADMIN);
    }
  }
}
