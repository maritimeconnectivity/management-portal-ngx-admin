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

import { AuthService } from '../auth/auth.service';
import { ResourceType } from '../shared/models/menuType';
import { AuthPermission, AuthPermissionForMSR, PermissionResolver } from '../auth/auth.permission';

export const hasAdminPermission = (context: ResourceType, authService: AuthService,
      isEditing: boolean, isOurServiceInstance?: boolean): boolean => {
  if (!authService.authState.rolesLoaded) {
    console.log('Role hasn\'t been loaded!');
    return false;
  }
  // MIR
  if (context !== ResourceType.Instance) {
    if (hasAdminPermissionInMIR(authService.authState.permission, AuthPermission.SiteAdmin)) { // super admin
      return true;
    } else if (context === ResourceType.User) {
      return hasAdminPermissionInMIR(authService.authState.permission, AuthPermission.UserAdmin);
    } else if (context === ResourceType.Device) {
      return hasAdminPermissionInMIR(authService.authState.permission, AuthPermission.DeviceAdmin);
    } else if (context === ResourceType.Vessel) {
      return hasAdminPermissionInMIR(authService.authState.permission, AuthPermission.VesselAdmin);
    } else if (context === ResourceType.MMS) {
      return hasAdminPermissionInMIR(authService.authState.permission, AuthPermission.MMSAdmin);
    } else if (context === ResourceType.Service) {
      return hasAdminPermissionInMIR(authService.authState.permission, AuthPermission.ServiceAdmin);
    } else if (context === ResourceType.Organization || context === ResourceType.Role) {
      return hasAdminPermissionInMIR(authService.authState.permission, AuthPermission.OrgAdmin);
    } else {
      return false;
    }
  } else {
  // MSR
    return isEditing ? // for editing
      // when it is for editing
      hasAdminPermissionInMSR(authService.authState.user.keycloakMSRPermissions, AuthPermissionForMSR.MSRAdmin) ||
        (isOurServiceInstance &&
        hasAdminPermissionInMSR(authService.authState.user.keycloakMSRPermissions, AuthPermissionForMSR.OrgServiceAdmin)) :
      // for creating
      hasAdminPermissionInMSR(authService.authState.user.keycloakMSRPermissions, AuthPermissionForMSR.OrgServiceAdmin) ||
      hasAdminPermissionInMSR(authService.authState.user.keycloakMSRPermissions, AuthPermissionForMSR.MSRAdmin);
  }
};

export const hasAdminPermissionInMIR = (myPermission: AuthPermission, permissionRole: AuthPermission): boolean => {
  switch (permissionRole) {
    case AuthPermission.User:
      return true;
    case AuthPermission.SiteAdmin:
      return PermissionResolver.isSiteAdmin(myPermission);
    case AuthPermission.OrgAdmin:
      return PermissionResolver.isOrgAdmin(myPermission);
    case AuthPermission.ApproveOrg:
      return PermissionResolver.canApproveOrg(myPermission);
    case AuthPermission.EntityAdmin:
      return PermissionResolver.isEntityAdmin(myPermission);
    case AuthPermission.ServiceAdmin:
      return PermissionResolver.isServiceAdmin(myPermission);
    case AuthPermission.DeviceAdmin:
      return PermissionResolver.isDeviceAdmin(myPermission);
    case AuthPermission.VesselAdmin:
      return PermissionResolver.isVesselAdmin(myPermission);
    case AuthPermission.UserAdmin:
      return PermissionResolver.isUserAdmin(myPermission);
    default:
      return false;
        }
};

export const hasAdminPermissionInMSR = (myPermissions: string[], permissionRole: AuthPermissionForMSR): boolean => {
  switch (permissionRole) {
    case AuthPermissionForMSR.User:
      return true;
    case AuthPermissionForMSR.OrgServiceAdmin:
      return PermissionResolver.isOrgServiceAdmin(myPermissions);
    case AuthPermissionForMSR.LedgerAdmin:
      return PermissionResolver.isLedgerAdmin(myPermissions);
    case AuthPermissionForMSR.MSRAdmin:
      return PermissionResolver.isMSRAdmin(myPermissions);
    default:
      return false;
 }
};