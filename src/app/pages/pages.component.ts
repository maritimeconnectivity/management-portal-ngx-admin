import { RoleControllerService } from './../backend-api/identity-registry/api/roleController.service';
import { KeycloakService } from 'keycloak-angular';
import { Component } from '@angular/core';

import { MENU_ITEMS, MENU_FOR_ADMIN } from './pages-menu';
import { AuthInfo } from '../auth/model/AuthInfo';
import { PermissionResolver, rolesToPermission } from '../auth/auth.permission';

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
    ) {
    const userToken = this.keycloakService.getKeycloakInstance().tokenParsed;
    if (userToken){
      AuthInfo.parseAuthInfo(userToken);
      roleControllerService.getMyRole(AuthInfo.orgMrn).subscribe(
        roles => {
          AuthInfo.permission = rolesToPermission(roles);
          // add menu for admin user
          if(PermissionResolver.canApproveOrg(AuthInfo.permission)){
            this.menu.find(e => e.title === 'Identity Registry').children.push(MENU_FOR_ADMIN);
          }
        }
      )
    } else {
      console.log("Move to main page!");
    }    
  }
}
