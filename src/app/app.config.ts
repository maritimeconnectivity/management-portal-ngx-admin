declare const fetch: Function
import { environment } from '../environments/environment';

export class AppConfig {
  static KEYCLOAK_JSON: string;
  static ENDORSEMENT_BASE_PATH: string;
  static IR_BASE_PATH: string;
  static HAS_SERVICE_REGISTRY: boolean;
  static SR_BASE_PATH: string;
  static ENVIRONMENT_TEXT: string;
  static IDP_NAMESPACE: string;

  public static _initialize() {
    AppConfig.IR_BASE_PATH = environment.irBasePath,
    AppConfig.SR_BASE_PATH = environment.srBasePath,
    AppConfig.KEYCLOAK_JSON = environment.keycloakJson,
    AppConfig.ENVIRONMENT_TEXT = environment.environmentText,
    AppConfig.IDP_NAMESPACE = environment.idpNamespace;
    AppConfig.HAS_SERVICE_REGISTRY = environment.hasServiceRegistry;
  }
}
AppConfig._initialize();