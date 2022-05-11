# Management Portal

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Management Portal is an interface to manage resources registered in [Maritime Identity Registry](https://github.com/maritimeconnectivity/IdentityRegistry) and [Maritime Service Registry](https://github.com/maritimeconnectivity/ServiceRegistry), which are core components of [Maritime Connectivity Platform](https://maritimeconnectivity.net/). The starting foundation of this project has been build from the [ngx-admin from Akveo](https://github.com/akveo/ngx-admin). This repository maintains a spin-off implementation of Management Portal under the Apache 2.0 License.

## Live demo
You can experience a live demo from [here](https://test-management.maritimeconnectivity.net). (WARNING: it is currently under development!)


## Development
### Installation
Install the project through:

```bash
npm install
```

Now it can be reached at  http://localhost:4200.

### Deployment
First, we would recommend to read the [instruction of Angular deployment](https://angular.io/guide/deployment).

From our end we deploy our Angular App to a GitHub pages through:

```bash
ng deploy --build-target=[%AngularBuildTarget] --repo=[%GitHubRepositoryURL] --cname=[%TargetURL]
```

*build-target* option needs to be a full name of *buildTarget* from "build", e.g., management-portal:build:test for test configuration.

The deployment is powered by [angular-cli-ghpages](https://github.com/angular-schule/angular-cli-ghpages).

### Configuration
There are examples of environment configuration in the 'src/environments' folder.

Configuration parameter covers:

* *production*: boolean value of whether a build for production or not

* *staging*: boolean value of whether a build for staging or not

* *irBasePath*: url of MIR API

* *oidcBasePath*: url of MIR OIDC (keycloak endpoint for the MCC testbed)

* *hasServiceRegistry*: boolean value of whether the provider has service registry or not

* *srBasePath*: url of MSR API

* *environmentTitle*: title showing at the front page

* *termsOfUse*: terms of use using in the registration

* *idpNamespace*: identity provider short ID (*IPID* in MCP IDsec2 MCC Identity Management and Security; Identity Management) included in MCP MRN, e.g., 'mcc-test'

* *environmentName*: environment name showing at the front page

## License
This project is licensed under the Apache 2.0 License - see the [LICENSE.md](LICENSE.md) file for details.
