import { Injectable } from '@angular/core';
import { EntityDataService } from './entity-data.service';

@Injectable({
  providedIn: 'root'
})
export class VesselDataService extends EntityDataService {
  getList() {
    return [
      {
        "id": 7,
        "createdAt": 1635411528000,
        "updatedAt": 1635411528000,
        "idOrganization": 3,
        "mrn": "urn:mrn:mcp:vessel:mcc:core:test001",
        "permissions": "",
        "name": "Test vessel",
        "attributes": [
          {
            "createdAt": 1635411528000,
            "updatedAt": 1635411528000,
            "attributeName": "ais-class",
            "attributeValue": "None"
          },
          {
            "createdAt": 1635411528000,
            "updatedAt": 1635411528000,
            "attributeName": "imo-number",
            "attributeValue": "12345678"
          },
          {
            "createdAt": 1635411528000,
            "updatedAt": 1635411528000,
            "attributeName": "callsign",
            "attributeValue": "None"
          },
          {
            "createdAt": 1635411528000,
            "updatedAt": 1635411528000,
            "attributeName": "port-of-register",
            "attributeValue": "None"
          },
          {
            "createdAt": 1635411528000,
            "updatedAt": 1635411528000,
            "attributeName": "flagstate",
            "attributeValue": "None"
          },
          {
            "createdAt": 1635411528000,
            "updatedAt": 1635411528000,
            "attributeName": "mmsi-number",
            "attributeValue": "87654321"
          }
        ],
        "certificates": []
      }
    ];
  }
}
