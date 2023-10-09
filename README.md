# Management Portal
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Management Portal is an interface to manage resources registered in [Maritime Identity Registry](https://github.com/maritimeconnectivity/IdentityRegistry) and [Maritime Service Registry](https://github.com/maritimeconnectivity/ServiceRegistry), which are core components of [Maritime Connectivity Platform](https://maritimeconnectivity.net/). The starting foundation of this project has been build from the [ngx-admin from Akveo](https://github.com/akveo/ngx-admin). This repository maintains a spin-off implementation of Management Portal under the Apache 2.0 License.

## Live demo
You can experience a live demo from [our public demonstrator environment](https://management.maritimeconnectivity.net).

## Development

### Requirement
- The use of NPM version 14.20.1

### Installation
To install ngx-admin you have to use NodeJS version 14.14+ because of [node-sass](https://github.com/sass/node-sass) version utilized in the application.

Install the project through:

```bash
npm install --save --legacy-peer-deps
```

Currently there are some conflicts in dependencies which will be resolved soon.

Now it can be reached at http://localhost:4200.

Remember the url (here *http://localhost:4200*) should be listed in the *Valid redirect URIs* at the MCP-Portal client in the MCP realm of your Keycloak (or OIDC) setup.

### Deployment
First, we would recommend to read the [instruction of Angular deployment](https://angular.io/guide/deployment).

#### Deployment to GitHub Pages through Angular deploy command

For successful deployment you need to be located at the root of the project folder.

You can deploy the Angular App to a GitHub pages through:

```bash
ng deploy —build-target=[%AngularBuildTarget] —repo=[%GitHubRepositoryURL] —cname=[%TargetURL]
```

*build-target* option needs to be a full name of *buildTarget* from "build", e.g., management-portal:build:test for test configuration.

The deployment is powered by [angular-cli-ghpages](https://github.com/angular-schule/angular-cli-ghpages).

#### Deployment to GitHub Pages through GitHub Action
You can also take [our GitHub Action script](https://github.com/maritimeconnectivity/ManagementPortal/blob/main/.github/workflows/main.yml) to deploy your own management portal to GitHub Pages.

### Build and Run as a Docker image

At the root of the project folder to build an docker image with default Dockerfile:

```bash
docker build -t management-portal-trial . 
```

After build, run:

```bash
docker run -p $YourPortNumber:4200 management-portal-trial
```

Now it can be reached at http://localhost:`$YourPortNumber`.

Again, remember the url (here *http://localhost:`$YourPortNumber`*) should be listed in the *Valid redirect URIs* at the MCP-Portal client in the MCP realm of your Keycloak (or OIDC) setup.

### Configuration
There are examples of environment configuration in the 'src/environments' folder.

Configuration parameter covers:

* *production*: boolean value of whether a build for production or not
* *staging*: boolean value of whether a build for staging or not
* *irProvider*: name of the MIR provider
* *irContact*: contact of the MIR provider
* *irBasePath*: url of MIR API
* *oidcBasePath*: url of MIR OIDC (keycloak endpoint for the MCC testbed)
* *hasServiceRegistry*: boolean value of whether the provider has service registry or not
* *srProvider*: name of the MSR provider if exist
* *srContact*: contact of the MSR provider if exist
* *srBasePath*: url of MSR API if exist
* hasMSRLedger: boolean value of whether the MSR Ledger is connected
* ledgerPath: url of the MSR Ledger if exist
* *mpProvider*: name of the Management Portal provider
* *mpContact*: contact of the Management Portal provider
* *environmentTitle*: title showing at the front page
* *termsOfUse*: terms of use using in the registration
* *idpNamespace*: identity provider short ID (*IPID* in MCP IDsec2 MCC Identity Management and Security; Identity Management) included in MCP MRN, e.g., 'mcc-test'
* *environmentName*: environment name showing at the front page
* *mpName*: official name of management portal
* *footerName*: name you can put at footer
* *logoImg*: logo image path, will be shown at the front page, e.g., 'assets/images/logo.svg'

  
#### Client generation for backend integration with MIR and MSR
The client for MIR and MSR was auto-generated from the corresponding swagger files with [Swagger Editor](https://editor.swagger.io/).

After generation, you need to fix a module(e.g., *api.module.ts*), a part of auto-generated, to inject the configuration like this,
'''

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    {
        provide: AgentControllerService,
        useFactory: (http: HttpClient) => {
          return new AgentControllerService(http, AppConfig.IR_BASE_PATH, null);
      },
        deps: [HttpClient]
    },
    ...
    ]
  })
'''

#### Configurable interface through ColumnFor*.json file
The main idea of making the Management Portal configurable has done by JSON formulation of interface capability for each attribute.
We have [ColumnForMenu.json](https://github.com/maritimeconnectivity/ManagementPortal/blob/main/src/app/shared/models/columnForMenu.ts) and [ColumnForCert.json](https://github.com/maritimeconnectivity/ManagementPortal/blob/main/src/app/shared/models/columnForCertificate.ts) as examples on how it depicts functional interfaces for MCP entities and certificate respectively.

### Localization support
Currently English(en-GB) and Korean(ko-KR) are supported.

## Acknowledgement
This development is a part of the project titled “Development of Open Platform Technologies for Smart Maritime Safety and Industries” funded by the Korea Research Institute of Ships and Ocean Engineering (PES4070).

## License
This project is licensed under the Apache 2.0 License - see the [LICENSE.md](LICENSE.md) file for details.
