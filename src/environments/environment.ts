/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  staging: false,
  irBasePath: 'https://test-api.maritimeconnectivity.net',
  oidcBasePath: 'https://test-maritimeid.maritimeconnectivity.net',
  hasServiceRegistry: true,
  srBasePath: 'https://msr-test.maritimeconnectivity.net',
  keycloakJson: 'assets/test-keycloak.json',
  environmentTitle: 'MCC Testbed TEST',
  termsOfUse: 'By applying for access to the MCP testbed, you agree not to store any personal information on the platform such as names and email addresses. Please use generic names, such as \'John Doe\' and generic email addresses such as \'info@company.com\'. It does need to be a working email address though, since access will be granted through this email address. Furthermore, if anyone chooses to federate an identity registry into the MCP testbed, this should only contain test data - not actual personal information. This is due to the European Union General Data Protection Regulation (GDPR). For more information, contact the MCC secretariat.',
  idpNamespace: 'mcc-test',
};
