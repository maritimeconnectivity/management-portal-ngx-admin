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

import { NotifierService } from 'angular-notifier';
import { RoleControllerService } from './../backend-api/identity-registry/api/roleController.service';
import { EventEmitter, Injectable } from '@angular/core';
import { AuthState } from './model/AuthState';
import { StaticAuthInfo } from './model/StaticAuthInfo';
import { AuthPermission, rolesToPermission } from './auth.permission';
import { AuthUser } from './model/AuthUser';
import { Role } from '../backend-api/identity-registry/model/role';

import RoleNameEnum = Role.RoleNameEnum;
import { Router } from '@angular/router';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static staticAuthInfo: StaticAuthInfo = {}; // This is needed to save some information about user, because these informations is found before this class is initiated

	public rolesLoaded: EventEmitter<any> = new EventEmitter<any>();
  
  public authState: AuthState;
  private realmName = 'MCP';

  constructor(
    private roleControllerService: RoleControllerService,
    private notifierService: NotifierService,
    private router: Router,
    ) {
    this.authState = this.createAuthState();
    this.findPermissionRoles();
  }

  private findPermissionRoles() {
    if (this.authState.loggedIn) {
      this.roleControllerService.getMyRole(this.authState.orgMrn).subscribe(
        roles => {
          this.authState.permission = rolesToPermission(roles);
          this.authState.rolesLoaded = true;
          this.rolesLoaded.emit('');
        },
        error => {
          this.authState.permission = AuthPermission.User;
          this.notifierService.notify('error', 'Error trying to fetch user permissions - ' + error.message);
          this.authState.rolesLoaded = true;
          this.rolesLoaded.emit('');
        }
      );
    }
  }
private createAuthState(): AuthState {
  return {
    loggedIn: AuthService.staticAuthInfo.loggedIn,
    permission: AuthPermission.User,
    orgMrn: AuthService.staticAuthInfo.orgMrn,
    orgName: AuthService.staticAuthInfo.orgName,
    user: AuthService.staticAuthInfo.user,
    rolesLoaded: false,
    acting: false,
  };
}

  public static parseAuthInfo(keycloakToken: any) {
    if (!keycloakToken) {
      throw new Error('Keycloak token parse error: Token not present');
    }
    if (!keycloakToken.org) {
      throw new Error('Keycloak token parse error: \'org\' not present');
    }
    if (!keycloakToken.mrn) {
      throw new Error('Keycloak token parse error: \'mrn\' not present');
    }
    if (!keycloakToken.email) {
      throw new Error('Keycloak token parse error: \'email\' not present');
    }

    AuthService.staticAuthInfo.orgMrn = keycloakToken.org;
    const firstname = keycloakToken.given_name ? keycloakToken.given_name : '';
    const lastname = keycloakToken.family_name ? keycloakToken.family_name : '';
    const permissions = keycloakToken.permissions ? keycloakToken.permissions : '';
    const rolesInMSR = keycloakToken['resource_access'] && keycloakToken['resource_access']['service-registry'] && keycloakToken['resource_access']['service-registry']['roles'] ? keycloakToken['resource_access']['service-registry']['roles'] : [];
    const mrn = keycloakToken.mrn;
    const email = keycloakToken.email;
    const preferredUsername = keycloakToken.preferred_username
    ? keycloakToken.preferred_username
    : '';
    const authUser: AuthUser = {
        firstName: firstname,
        lastName: lastname,
        mrn: mrn,
        email: email,
        organization: keycloakToken.org,
        preferredUsername: preferredUsername,
        keycloakMIRPermissions: permissions.toString(),
        keycloakMSRPermissions: rolesInMSR,
    };
    AuthService.staticAuthInfo.user = authUser;
  }

  isMyOrg(orgMrn:string){
	  return this.authState.orgMrn === orgMrn;
  }

  loginUrl(): string {
    return '/login';
  }

  login() {
  	const url = window.location;
    AuthService.staticAuthInfo.authz.login({
      redirectUri:  url.protocol + '//' + url.host + '/pages/ir/organizations/'
    });
  }

  logout() {
	  try {
      this.authState.loggedIn = false;
      const url = window.location;
      const loginPage = url.protocol + '//' + url.host + '/login';
		  AuthService.staticAuthInfo.authz.logout(loginPage);
		  AuthService.staticAuthInfo.authz = null;
	  } catch (err) { // State is somehow lost. Just do nothing.
	  }
  }

  public getLogoutUrl(): string {
    const url = window.location;
    const loginPage = url.protocol + '//' + url.host + '/login';
    return AppConfig.OIDC_BASE_PATH + '/auth/realms/'+this.realmName+'/protocol/openid-connect/logout?redirect_uri=' + loginPage;
  }

  static getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (AuthService.staticAuthInfo.authz.token) {
        AuthService.staticAuthInfo.authz.updateToken(30)
          .success(() => {
            resolve(<string>AuthService.staticAuthInfo.authz.token);
          })
          .error((error) => {
            AuthService.handle401();
          });
      }
    });
  }

  public updateOrgName(orgName: string) {
    AuthService.staticAuthInfo.orgName = orgName;
    this.authState.orgName = orgName;
  }

	public static handle401() {
		try {
			AuthService.staticAuthInfo.loggedIn = false;
			AuthService.staticAuthInfo.authz.logout({redirectUri: window.location.origin + '/#' + AuthService.staticAuthInfo.logoutUrl + '?reason=401'});
			AuthService.staticAuthInfo.authz = null;
		}catch (err) { // State is somehow lost. Just do nothing.

		}
	}

	public static handleCacheError() {
		try {
			AuthService.staticAuthInfo.loggedIn = false;
			AuthService.staticAuthInfo.authz.logout({redirectUri: window.location.origin + '/#' + AuthService.staticAuthInfo.logoutUrl + '?reason=cache'});
			AuthService.staticAuthInfo.authz = null;
		}catch (err) { // State is somehow lost. Just do nothing.

		}
	}
}
