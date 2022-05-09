import { AppConfig } from './../app.config';
import { KeycloakService } from 'keycloak-angular';
import { AuthService } from './auth.service';

export const initializeKeycloak = (keycloak: KeycloakService): () => Promise<boolean> => {
    return () =>
      keycloak.init({
        config: {
          url: AppConfig.OIDC_BASE_PATH + '/auth/',
          realm: 'MCP',
          clientId: 'MCP-Portal',
        },
        initOptions: {
          onLoad: 'check-sso',
          flow: 'standard',
        },
        enableBearerInterceptor: true,
        bearerPrefix: 'Bearer',
        bearerExcludedUrls: [
            '/assets',
            '/clients/public']
      }).then((authenticated: any) => {
        AuthService.staticAuthInfo.authz = keycloak.getKeycloakInstance();
        AuthService.staticAuthInfo.logoutUrl = "/login";
        if (authenticated) {
          AuthService.staticAuthInfo.loggedIn = true;

          AuthService.parseAuthInfo(keycloak.getKeycloakInstance().tokenParsed);

          keycloak.getKeycloakInstance().onAuthLogout = function() {
            console.log("USER LOGGED OUT");
            AuthService.handle401();
          };
          keycloak.getKeycloakInstance().onTokenExpired = function() {
            console.log("TOKEN EXPIRED LOGGED OUT");
          };
            return true;
          } else {
            AuthService.staticAuthInfo.loggedIn = false;
            return false;
          }
        }
      );
  }