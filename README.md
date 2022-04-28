# Management Portal

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Management Portal is an interface to manage resources registered in [Maritime Identity Registry](https://github.com/maritimeconnectivity/IdentityRegistry) and [Maritime Service Registry](https://github.com/maritimeconnectivity/ServiceRegistry), which are core components of [Maritime Connectivity Platform](https://maritimeconnectivity.net/). The starting foundation of this project has been build from the [ngx-admin from Akveo](https://github.com/akveo/ngx-admin). This repository maintains a spin-off implementation of Management Portal under the Apache 2.0 License.

## Live demo
You can experience a live demo from [here](https://test-manage.maritimeconnectivity.net).


## Development
### Installation
Install the project through:

```bash
npm install
```

Now it can be reached at  http://localhost:4200.

### Deployment
We would recommend to read the [instruction of Angular deployment](https://angular.io/guide/deployment).

From our end we deploy our code to a GitHub pages through:

```bash
ng deploy --repo=[%RepositoryGitAddress]
```

### Configuration
There are examples of environment configuration in the 'src/environments' folder.

Configuration parameter covers:

* *production*: indicates a build for production or not

* *staging*: indicates a build for staging or not

* *irBasePath*: url of MIR API

* *oidcBasePath*: url of MIR OIDC (keycloak endpoint for the MCC testbed)

* *hasServiceRegistry*: boolean value of whether the provider has service registry or not

* *srBasePath*: url of MSR API

* *environmentTitle*: title showing at the front page

* *termsOfUse*: terms of use using in the registration

* *idpNamespace*: an identity provider short ID included in MCP MRN, e.g., 'mcc-test'

## License
This project is licensed under the Apache 2.0 License - see the [LICENSE.md](LICENSE.md) file for details.