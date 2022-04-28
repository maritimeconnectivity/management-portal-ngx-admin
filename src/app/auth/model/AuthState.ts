import { AuthPermission, AuthPermissionForMSR } from "../auth.permission";
import { AuthUser } from "./AuthUser";

export interface AuthState {
  loggedIn: boolean;
  permission: any;
  orgMrn: string;
  orgName: string;
  user: AuthUser;
  rolesLoaded: boolean;
  acting: boolean;
  hasPermissionInMIR(permissionRole: AuthPermission): boolean;
  hasPermissionInMSR(permissionRole: AuthPermissionForMSR): boolean;
}