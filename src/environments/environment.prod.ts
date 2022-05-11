/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
 export const environment = {
  production: true,
  staging: false,
  irBasePath: 'https://api.maritimeconnectivity.net',
  irProvider: 'MCP Consortium',
  irContact: 'info@maritimeconnectivity.net',
  oidcBasePath: 'https://maritimeid.maritimeconnectivity.net',
  hasServiceRegistry: false,
  srBasePath: '',
  srProvider: '',
  srContact: '',
  mpProvider: 'MCP Consortium',
  mpContact: 'info@maritimeconnectivity.net',
  environmentTitle: 'MCC Testbed',
  termsOfUse: 'By applying for access to the MCP testbed, you agree not to store any personal information on the platform such as names and email addresses. Please use generic names, such as \'John Doe\' and generic email addresses such as \'info@company.com\'. It does need to be a working email address though, since access will be granted through this email address. Furthermore, if anyone chooses to federate an identity registry into the MCP testbed, this should only contain test data - not actual personal information. This is due to the European Union General Data Protection Regulation (GDPR). For more information, contact the MCC secretariat.',
  idpNamespace: 'mcc',
  environmentName: 'public-demonstrator',
};
