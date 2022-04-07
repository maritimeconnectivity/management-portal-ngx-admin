import { Injectable } from '@angular/core';
import { EntityDataService } from './entity-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService extends EntityDataService {
  getList() {
    return [
      {
        "id": 1,
        "createdAt": 1605529442000,
        "updatedAt": 1605529442000,
        "idOrganization": 3,
        "mrn": "urn:mrn:mcp:user:mcc:core:admin",
        "permissions": "MCPADMIN",
        "firstName": "Admin",
        "lastName": "Admin",
        "email": "info@maritimeconnectivity.net",
        "certificates": [
          {
            "id": 38,
            "createdAt": 1623679933000,
            "updatedAt": 1623679933000,
            "certificate": "-----BEGIN CERTIFICATE-----\nMIIEVzCCA92gAwIBAgIUDO29CiLZ2JOCGB1gvGZRQl7FQw8wCgYIKoZIzj0EAwMw\ngcwxLDAqBgoJkiaJk/IsZAEBDBx1cm46bXJuOm1jcDpjYTptY2M6bWNwLWlkcmVn\nMQswCQYDVQQGEwJESzEQMA4GA1UECAwHRGVubWFyazETMBEGA1UEBwwKQ29wZW5o\nYWdlbjEMMAoGA1UECgwDTUNQMQwwCgYDVQQLDANNQ1AxHjAcBgNVBAMMFU1DUCBJ\nZGVudGl0eSBSZWdpc3RyeTEsMCoGCSqGSIb3DQEJARYdaW5mb0BtYXJpdGltZWNv\nbm5lY3Rpdml0eS5uZXQwHhcNMjEwNjE0MTQxMjEzWhcNMjMwNjE0MTQxMjEzWjCB\ntDELMAkGA1UEBhMCREsxITAfBgNVBAoMGHVybjptcm46bWNwOm9yZzptY2M6Y29y\nZTENMAsGA1UECwwEdXNlcjEUMBIGA1UEAwwLQWRtaW4gQWRtaW4xLzAtBgoJkiaJ\nk/IsZAEBDB91cm46bXJuOm1jcDp1c2VyOm1jYzpjb3JlOmFkbWluMSwwKgYJKoZI\nhvcNAQkBFh1pbmZvQG1hcml0aW1lY29ubmVjdGl2aXR5Lm5ldDB2MBAGByqGSM49\nAgEGBSuBBAAiA2IABC3X3ndiFzD31pGxyY9Kfe7FUUtD4ylxxbban9DlW87K7bCq\nK5/sZqgtDPawxgEEncLXx0ETrCOhGT3XtpNPNVV6PFU6aFjpvsuy0ozivb2pIQ2s\n8B7FY5wdkWiiK2y+sqOCAZQwggGQMGgGA1UdEQRhMF+gIgYUaYKGu7vIm7Cox8ue\n2YCAqq7XihugCgwITUNQQURNSU6gOQYUaYOYvNfAnvDwx8uqnYCAqq7XihugIQwf\ndXJuOm1ybjptY3A6dXNlcjptY2M6Y29yZTphZG1pbjAfBgNVHSMEGDAWgBQfDlvi\nBmA3By9QeVOYTVuuXpDQGjAdBgNVHQ4EFgQUhz7bupMeqc2HCenHrVXo5R0AfOgw\nawYDVR0fBGQwYjBgoF6gXIZaaHR0cDovL2FwaS5tYXJpdGltZWNvbm5lY3Rpdml0\neS5uZXQveDUwOS9hcGkvY2VydGlmaWNhdGVzL2NybC91cm46bXJuOm1jcDpjYTpt\nY2M6bWNwLWlkcmVnMHcGCCsGAQUFBwEBBGswaTBnBggrBgEFBQcwAYZbaHR0cDov\nL2FwaS5tYXJpdGltZWNvbm5lY3Rpdml0eS5uZXQveDUwOS9hcGkvY2VydGlmaWNh\ndGVzL29jc3AvdXJuOm1ybjptY3A6Y2E6bWNjOm1jcC1pZHJlZzAKBggqhkjOPQQD\nAwNoADBlAjEAmsMW6Plbgp/G8WKow+HGtRPVbKQYEHP9D2U7/F5udpSct7f7eobJ\nw6z6DqgBwaucAjBgi4iOpD7xnP+HO1c2Zg/6b9OKsVtNvGAk00SEXVhCv4skCE1i\nK6dO+vzxofLuhio=\n-----END CERTIFICATE-----\n",
            "start": 1623679933000,
            "end": 1686751933000,
            "serialNumber": "73809633533127476833608218176271909626822607631",
            "revoked": false
          }
        ]
      },
      {
        "id": 2,
        "createdAt": 1605621886000,
        "updatedAt": 1605621886000,
        "idOrganization": 3,
        "mrn": "urn:mrn:mcp:user:mcc:core:admin1",
        "permissions": "MCPADMIN",
        "firstName": "Admin1",
        "lastName": "Admin",
        "email": "admin@maritimeconnectivity.net",
        "certificates": []
      },
      {
        "id": 35,
        "createdAt": 1618926219000,
        "updatedAt": 1618926219000,
        "idOrganization": 3,
        "mrn": "urn:mrn:mcp:user:mcc:core:admin2",
        "permissions": "MCPADMIN",
        "firstName": "Admin2",
        "lastName": "Admin",
        "email": "admin2@maritimeconnectivity.net",
        "certificates": []
      }
    ];
  }
}
