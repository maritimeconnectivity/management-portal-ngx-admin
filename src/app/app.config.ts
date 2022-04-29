declare const fetch: Function
import { environment } from '../environments/environment';

export class AppConfig {
  static OIDC_BASE_PATH: string;
  static ENDORSEMENT_BASE_PATH: string;
  static IR_BASE_PATH: string;
  static HAS_SERVICE_REGISTRY: boolean;
  static SR_BASE_PATH: string;
  static ENVIRONMENT_TITLE: string;
  static TERMS_OF_USE: string;
  static IDP_NAMESPACE: string;

  public static _initialize() {
    AppConfig.IR_BASE_PATH = environment.irBasePath,
    AppConfig.SR_BASE_PATH = environment.srBasePath,
    AppConfig.ENVIRONMENT_TITLE = environment.environmentTitle,
    AppConfig.TERMS_OF_USE = environment.termsOfUse,
    AppConfig.IDP_NAMESPACE = environment.idpNamespace;
    AppConfig.HAS_SERVICE_REGISTRY = environment.hasServiceRegistry;
    AppConfig.OIDC_BASE_PATH = environment.oidcBasePath;
  }
}
AppConfig._initialize();