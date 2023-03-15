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

declare const fetch: Function
import { environment } from '../environments/environment';

export class AppConfig {
  static OIDC_BASE_PATH: string;
  static ENDORSEMENT_BASE_PATH: string;
  static IR_BASE_PATH: string;
  static HAS_SERVICE_REGISTRY: boolean;
  static SR_BASE_PATH: string;
  static ENVIRONMENT_TITLE: string;
  static IDP_NAMESPACE: string;
  static ENVIRONMENT_NAME: string;
  static IR_PROVIDER: string;
  static IR_CONTACT: string;
  static SR_PROVIDER: string;
  static SR_CONTACT: string;
  static HAS_MSR_LEDGER: boolean;
  static LEDGER_PATH: string;
  static MP_PROVIDER: string;
  static TERMS_OF_USE: string;
  static MP_CONTACT: string;
  static MP_VERSION: string;

  public static _initialize() {
    AppConfig.IR_BASE_PATH = environment.irBasePath,
    AppConfig.SR_BASE_PATH = environment.hasServiceRegistry ? environment.srBasePath : '',
    AppConfig.ENVIRONMENT_TITLE = environment.environmentTitle,
    AppConfig.IDP_NAMESPACE = environment.idpNamespace;
    AppConfig.HAS_SERVICE_REGISTRY = environment.hasServiceRegistry;
    AppConfig.OIDC_BASE_PATH = environment.oidcBasePath;
    AppConfig.ENVIRONMENT_NAME = environment.environmentName;
    AppConfig.IR_PROVIDER = environment.irProvider;
    AppConfig.IR_CONTACT = environment.irContact;
    AppConfig.SR_PROVIDER = environment.srProvider;
    AppConfig.SR_CONTACT = environment.srContact;
    AppConfig.HAS_MSR_LEDGER = environment.hasMSRLedger;
    AppConfig.LEDGER_PATH = environment.hasMSRLedger ? environment.ledgerPath : '';
    AppConfig.MP_PROVIDER = environment.mpProvider;
    AppConfig.TERMS_OF_USE = environment.termsOfUse;
    AppConfig.MP_CONTACT = environment.mpContact;
    AppConfig.MP_VERSION = require( '../../package.json').version;
  }
}
AppConfig._initialize();