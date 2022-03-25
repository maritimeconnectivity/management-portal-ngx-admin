import { NotifierService } from 'angular-notifier';
import { Organization } from './../backend-api/identity-registry/model/organization';
import { OrganizationControllerService } from './../backend-api/identity-registry/api/organizationController.service';
import { RoleControllerService } from './../backend-api/identity-registry/api/roleController.service';
import { KeycloakService } from 'keycloak-angular';
import { Component } from '@angular/core';

import { MENU_ITEMS, MENU_FOR_ADMIN, MENU_FOR_ORG, MENU_FOR_SR, MENU_FOR_IR } from './pages-menu';
import { AuthInfo } from '../auth/model/AuthInfo';
import { PermissionResolver, rolesToPermission } from '../auth/auth.permission';
import { HttpErrorResponse } from '@angular/common/http';
import { AppConfig } from '../app.config';

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

  constructor(
    private keycloakService: KeycloakService,
    private roleControllerService: RoleControllerService,
    private organizationControllerService: OrganizationControllerService,
    private notifierService: NotifierService,
    ) {
    const userToken = this.keycloakService.getKeycloakInstance().tokenParsed;
    if (userToken){
      AuthInfo.parseAuthInfo(userToken);

      this.assignMCPComponentMenu();

      this.assignOrganizationMenu();

      this.assignAdminMenu();
    } else {
      console.log("Move to main page!");
    }
  }

  assignMCPComponentMenu = () => {
    if (AppConfig.HAS_SERVICE_REGISTRY) {
      this.menu.unshift(MENU_FOR_SR);
      this.menu.unshift(MENU_FOR_IR);
    } else {
      this.menu.unshift(MENU_FOR_IR);
    }
  }

  assignOrganizationMenu = () => {
    if (AuthInfo.orgMrn) {
      this.organizationControllerService.getOrganizationByMrn(AuthInfo.orgMrn).subscribe(
        (org: Organization) => {
          MENU_FOR_ORG.title = org.name;
          MENU_FOR_ORG.children.unshift({
            title: 'Info',
            link: 'ir/organizations/' + encodeURIComponent(AuthInfo.orgMrn),
          });
        },
        (error: HttpErrorResponse) => this.notifierService.notify('error', error.message),
      )
    this.menu.find(e => e.title === 'Identity Registry').children.unshift(MENU_FOR_ORG);
    }
  }

  assignAdminMenu = () => {
    this.roleControllerService.getMyRole(AuthInfo.orgMrn).subscribe(
      roles => {
        AuthInfo.permission = rolesToPermission(roles);
        // add menu for admin user
        if(PermissionResolver.canApproveOrg(AuthInfo.permission)){
          this.menu.find(e => e.title === 'Identity Registry').children.unshift(MENU_FOR_ADMIN);
        }
      }
    )
  }
}
