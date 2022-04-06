import { NotifierService } from 'angular-notifier';
import { RoleControllerService } from './../backend-api/identity-registry/api/roleController.service';
import { EventEmitter, Injectable } from '@angular/core';
import { AuthState } from './model/AuthState';
import { StaticAuthInfo } from './model/StaticAuthInfo';
import { AuthPermission, PermissionResolver } from './auth.permission';
import { AuthUser } from './model/AuthUser';
import { Role } from "../backend-api/identity-registry/model/role";

import RoleNameEnum = Role.RoleNameEnum;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static staticAuthInfo: StaticAuthInfo = {}; // This is needed to save some information about user, because these informations is found before this class is initiated

	public rolesLoaded: EventEmitter<any> = new EventEmitter<any>();
  
  public authState: AuthState;

  constructor(private roleControllerService: RoleControllerService, private notifierService: NotifierService) {
    this.authState = this.createAuthState();
    this.findPermissionRoles();
  }

  private findPermissionRoles() {
  if (this.authState.loggedIn) {
    this.roleControllerService.getMyRole(this.authState.orgMrn).subscribe(
      roles => {
        for (const roleString of roles) {
          const role = RoleNameEnum[roleString];
          switch (role) {
      case RoleNameEnum[RoleNameEnum.ORGADMIN]: {
                  this.authState.permission = this.authState.permission | AuthPermission.OrgAdmin;
                  break;
              }
      case RoleNameEnum[RoleNameEnum.SITEADMIN]: {
                  this.authState.permission = this.authState.permission | AuthPermission.SiteAdmin;
                  break;
              }
      case RoleNameEnum[RoleNameEnum.USERADMIN]: {
                  this.authState.permission = this.authState.permission | AuthPermission.UserAdmin;
                  break;
              }
      case RoleNameEnum[RoleNameEnum.DEVICEADMIN]: {
                  this.authState.permission = this.authState.permission | AuthPermission.DeviceAdmin;
                  break;
              }
      case RoleNameEnum[RoleNameEnum.VESSELADMIN]: {
                  this.authState.permission = this.authState.permission | AuthPermission.VesselAdmin;
                  break;
              }
      case RoleNameEnum[RoleNameEnum.SERVICEADMIN]: {
                  this.authState.permission = this.authState.permission | AuthPermission.ServiceAdmin;
                  break;
              }
      case RoleNameEnum[RoleNameEnum.ENTITYADMIN]: {
                  this.authState.permission = this.authState.permission | AuthPermission.EntityAdmin;
                  break;
              }
      case RoleNameEnum[RoleNameEnum.APPROVEORG]: {
                  this.authState.permission = this.authState.permission | AuthPermission.ApproveOrg;
                break;
      }
      default:
        this.authState.permission = this.authState.permission | AuthPermission.User;
          }
        }
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
	    user: AuthService.staticAuthInfo.user,
      rolesLoaded: false,
		acting: false,
		hasPermission(permissionRole: AuthPermission): boolean {
			switch (permissionRole) {
				case AuthPermission.User:
					return true;
				case AuthPermission.SiteAdmin:
					return PermissionResolver.isSiteAdmin(this.permission);
				case AuthPermission.OrgAdmin:
					return PermissionResolver.isOrgAdmin(this.permission);
				case AuthPermission.ApproveOrg:
					return PermissionResolver.canApproveOrg(this.permission);
				case AuthPermission.EntityAdmin:
					return PermissionResolver.isEntityAdmin(this.permission);
				case AuthPermission.ServiceAdmin:
					return PermissionResolver.isServiceAdmin(this.permission);
				case AuthPermission.DeviceAdmin:
					return PermissionResolver.isDeviceAdmin(this.permission);
				case AuthPermission.VesselAdmin:
					return PermissionResolver.isVesselAdmin(this.permission);
				case AuthPermission.UserAdmin:
					return PermissionResolver.isUserAdmin(this.permission);
				default:
					return false;
            }
		}
    };
  }

  public static parseAuthInfo(keycloakToken: any) {
    if (!keycloakToken) {
      throw new Error("Keycloak token parse error: Token not present");
    }
    if (!keycloakToken.org) {
      throw new Error("Keycloak token parse error: 'org' not present");
    }
    if (!keycloakToken.mrn) {
      throw new Error("Keycloak token parse error: 'mrn' not present");
    }
    if (!keycloakToken.email) {
      throw new Error("Keycloak token parse error: 'email' not present");
    }

    AuthService.staticAuthInfo.orgMrn = keycloakToken.org;
    const firstname = keycloakToken.given_name ? keycloakToken.given_name : "";
    const lastname = keycloakToken.family_name ? keycloakToken.family_name : "";
    const permissions = keycloakToken.permissions ? keycloakToken.permissions : '';
    const mrn = keycloakToken.mrn;
    const email = keycloakToken.email;
    const preferredUsername = keycloakToken.preferred_username
    ? keycloakToken.preferred_username
    : "";
    const authUser: AuthUser = {
        firstName: firstname,
        lastName: lastname,
        mrn: mrn,
        email: email,
        organization: keycloakToken.org,
        preferredUsername: preferredUsername,
        keycloakPermissions: permissions.toString(),
    };
    AuthService.staticAuthInfo.user = authUser;
  }

  isMyOrg(orgMrn:string){
	  return this.authState.orgMrn === orgMrn;
  }

  loginUrl(): string {
    return "/login";
  }

  login() {
  	let url = window.location;
    AuthService.staticAuthInfo.authz.login({redirectUri:  url.protocol + "//" + url.host + "/pages/ir/organizations/" + AuthService.staticAuthInfo.orgMrn});
  }

  logout() {
	  try {
		  this.authState.loggedIn = false;
		  AuthService.staticAuthInfo.authz.logout();
		  AuthService.staticAuthInfo.authz = null;
	  } catch (err) { // State is somehow lost. Just do nothing.
	  }
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
