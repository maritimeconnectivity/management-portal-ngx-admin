# Management Portal

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Management Portal is an interface to manage resources registered in [Maritime Identity Registry](https://github.com/maritimeconnectivity/IdentityRegistry) and [Maritime Service Registry](https://github.com/maritimeconnectivity/ServiceRegistry), which are core components of [Maritime Connectivity Platform](https://maritimeconnectivity.net/). The starting foundation of this project has been build from the [ngx-admin from Akveo](https://github.com/akveo/ngx-admin). This repository maintains a spin-off implementation of Management Portal under the Apache 2.0 License.

## Live demo
You can experience a live demo from [our public demonstrator environment](https://management.maritimeconnectivity.net).


## Development
### Installation
To install ngx-admin you have to use NodeJS version 14.14+ because of [node-sass](https://github.com/sass/node-sass) version utilized in the application.

Install the project through:

```bash
npm install
```

Now it can be reached at  http://localhost:4200.

### Deployment
First, we would recommend to read the [instruction of Angular deployment](https://angular.io/guide/deployment).

#### Deployment to GitHub Pages through Angular deploy command
You can deploy the Angular App to a GitHub pages through:

```bash
ng deploy --build-target=[%AngularBuildTarget] --repo=[%GitHubRepositoryURL] --cname=[%TargetURL]
```

*build-target* option needs to be a full name of *buildTarget* from "build", e.g., management-portal:build:test for test configuration.

The deployment is powered by [angular-cli-ghpages](https://github.com/angular-schule/angular-cli-ghpages).

#### Deployment to GitHub Pages through GitHub Action
You can also take [our GitHub Action script](https://github.com/maritimeconnectivity/ManagementPortal/blob/main/.github/workflows/main.yml) to deploy your own management portal to GitHub Pages.

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

* *srProvider*: name of the MSR provider

* *srContact*: contact of the MSR provider

* *srBasePath*: url of MSR API

* *mpProvider*: name of the Management Portal provider

* *mpContact*: contact of the Management Portal provider

* *environmentTitle*: title showing at the front page

* *termsOfUse*: terms of use using in the registration

* *idpNamespace*: identity provider short ID (*IPID* in MCP IDsec2 MCC Identity Management and Security; Identity Management) included in MCP MRN, e.g., 'mcc-test'

* *environmentName*: environment name showing at the front page

#### Client generation for backend integration with MIR and MSR
The client for MIR and MSR was auto-generated from the corresponding swagger files with [Swagger Editor](https://editor.swagger.io/).

#### Configurable interface through ColumnFor*.json file
The main idea of making the Management Portal configurable has done by JSON formulation of interface capability for each attribute.

We have [ColumnForMenu.json](https://github.com/maritimeconnectivity/ManagementPortal/blob/main/src/app/shared/models/columnForMenu.ts) and [ColumnForCert.json](https://github.com/maritimeconnectivity/ManagementPortal/blob/main/src/app/shared/models/columnForCertificate.ts) as examples on how it depicts functional interfaces for MCP entities and certificate respectively.

### Localization support
Currently English and Korean are supported.

## Acknowledgement
This development is a part of the project titled “Development of Open Platform Technologies for Smart Maritime Safety and Industries” funded by the Korea Research Institute of Ships and Ocean Engineering (PES4070).

## License
This project is licensed under the Apache 2.0 License - see the [LICENSE.md](LICENSE.md) file for details.
