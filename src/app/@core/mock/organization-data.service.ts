import { Injectable } from '@angular/core';
import { EntityDataService } from './entity-data.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationDataService extends EntityDataService {
  getList() {
    return [
      {"id":10,"createdAt":1607586546000,"updatedAt":1607589078000,"name":"SMART Navigation Project, KRISO","mrn":"urn:mrn:mcp:org:mcc:smart001","email":"smart@kriso.re.kr","url":"http://www.smartnav.org","address":"1312 beon-gil, Yuseong-daero, Yuseong Gu, Daejeon","country":"Republic of Korea","federationType":"test-idp","certificates":[],"identityProviderAttributes":[]}
    ];
  }
}
