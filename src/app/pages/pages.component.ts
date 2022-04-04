import { AuthService } from './../auth/auth.service';
import { NotifierService } from 'angular-notifier';
import { Organization } from './../backend-api/identity-registry/model/organization';
import { OrganizationControllerService } from './../backend-api/identity-registry/api/organizationController.service';
import { RoleControllerService } from './../backend-api/identity-registry/api/roleController.service';
import { KeycloakService } from 'keycloak-angular';
import { Component } from '@angular/core';

import { MENU_ITEMS, MENU_FOR_ADMIN, MENU_FOR_ORG} from './pages-menu';
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
    private roleControllerService: RoleControllerService,
    private organizationControllerService: OrganizationControllerService,
    private notifierService: NotifierService,
    private authService: AuthService,
    ) {
    if (!AppConfig.HAS_SERVICE_REGISTRY) {
      this.menu = this.menu.filter(e => e.title !== 'Service Registry');
    }

    this.assignOrganizationMenu();

    this.assignAdminMenu();
  }

  assignOrganizationMenu = () => {
    if (this.authService.authState.orgMrn) {
      this.organizationControllerService.getOrganizationByMrn(this.authService.authState.orgMrn).subscribe(
        (org: Organization) => {
          MENU_FOR_ORG.title = org.name;
          MENU_FOR_ORG.children.unshift({
            title: 'Info',
            link: 'ir/organizations/' + encodeURIComponent(this.authService.authState.orgMrn),
          });
        },
        (error: HttpErrorResponse) => this.notifierService.notify('error', error.message),
      )
    this.menu.find(e => e.title === 'Identity Registry').children.unshift(MENU_FOR_ORG);
    }
  }

  assignAdminMenu = () => {
    this.roleControllerService.getMyRole(this.authService.authState.orgMrn).subscribe(
      roles => {
        this.authService.authState.permission = rolesToPermission(roles);
        // add menu for admin user
        if(PermissionResolver.canApproveOrg(this.authService.authState.permission)){
          this.menu.find(e => e.title === 'Identity Registry').children.unshift(MENU_FOR_ADMIN);
        }
      }
    )
  }
}
