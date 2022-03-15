import { KeycloakService } from 'keycloak-angular';

export const initializeKeycloak = (keycloak: KeycloakService): () => Promise<boolean> => {
    return () =>
      keycloak.init({
        config: {
          url: 'https://test-maritimeid.maritimeconnectivity.net/auth/',
          realm: 'MCP',
          clientId: 'MCP-Portal',
        },
        initOptions: {
          onLoad: 'login-required',
          flow: 'standard',
        },
        enableBearerInterceptor: true,
        bearerPrefix: 'Bearer',
        bearerExcludedUrls: [
            '/assets',
            '/clients/public']
      });
  }