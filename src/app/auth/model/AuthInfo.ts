import { AuthUser } from "./AuthUser";

export abstract class AuthInfo {
    public static permission?: any;
    public static orgMrn?: string;
    public static user?: AuthUser;

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

        this.orgMrn = keycloakToken.org;
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
        this.user = authUser;
      }
}