import { NbMenuService } from '@nebular/theme';
import { AuthService } from './../auth/auth.service';
import { NotifierService } from 'angular-notifier';
import { Organization } from './../backend-api/identity-registry/model/organization';
import { OrganizationControllerService } from './../backend-api/identity-registry/api/organizationController.service';
import { RoleControllerService } from './../backend-api/identity-registry/api/roleController.service';
import { KeycloakService } from 'keycloak-angular';
import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS, MIR_MENU_FOR_ADMIN, MIR_MENU_FOR_ORG, MSR_MENU_FOR_ORG} from './pages-menu';
import { AuthPermission, PermissionResolver, rolesToPermission } from '../auth/auth.permission';
import { HttpErrorResponse } from '@angular/common/http';
import { AppConfig } from '../app.config';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu" autoCollapse="true"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {
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
  }

  ngOnInit(): void {
    if (this.authService.rolesLoaded) {
      this.applyRoleToMenu();
    } else {
      this.authService.rolesLoaded.subscribe( () => this.applyRoleToMenu());
    }
  }

  applyRoleToMenu = () => {
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
    if (this.authService.authState.orgMrn) {
      this.organizationControllerService.getOrganizationByMrn(this.authService.authState.orgMrn).subscribe(
        (org: Organization) => {
          this.authService.updateOrgName(org.name);
          MIR_MENU_FOR_ORG.title = this.authService.authState.orgName;
          MIR_MENU_FOR_ORG.children.unshift({
            title: 'Info',
            link: 'ir/organizations/' + encodeURIComponent(this.authService.authState.orgMrn),
          });
        },
        (error: HttpErrorResponse) => this.notifierService.notify('error', error.message),
      )
    this.menu.find(e => e.title === 'Identity Registry').children.unshift(MIR_MENU_FOR_ORG);
    }
  }

  assignOrganizationNameForMSR = () => {
    if (this.menu.find(e => e.title === 'Service Registry').children.find(e => e.title === MSR_MENU_FOR_ORG.title)) {
      return ;
    }
    if (this.authService.authState.user) {
      if (PermissionResolver.isOrgServiceAdmin(this.authService.authState.user.keycloakMSRPermissions)) {
        this.organizationControllerService.getOrganizationByMrn(this.authService.authState.orgMrn).subscribe(
          (org: Organization) => {
            MSR_MENU_FOR_ORG.title = this.authService.authState.orgName;
          },
          (error: HttpErrorResponse) => this.notifierService.notify('error', error.message),
        )
      this.menu.find(e => e.title === 'Service Registry').children.unshift(MSR_MENU_FOR_ORG);
      }
    }
  }

  assignAdminMenu = () => {
    if (this.menu.find(e => e.title === 'Identity Registry').children.find(e => e.title === MIR_MENU_FOR_ADMIN.title)) {
      return ;
    }
    this.roleControllerService.getMyRole(this.authService.authState.orgMrn).subscribe(
      roles => {
        this.authService.authState.permission = rolesToPermission(roles);
        // add menu for admin user
        if(this.authService.authState.permission && PermissionResolver.canApproveOrg(this.authService.authState.permission)){
          this.menu.find(e => e.title === 'Identity Registry').children.unshift(MIR_MENU_FOR_ADMIN);
        }
    });
  }
}
