export interface AuthState {
  loggedIn: boolean;
  permission: any;
  orgMrn: string;
  //user: AuthUser;
  rolesLoaded: boolean;
  acting: boolean;
  //hasPermission(permissionRole: AuthPermission): boolean;
}