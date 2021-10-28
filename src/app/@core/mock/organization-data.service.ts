import { Injectable } from '@angular/core';
import { Organization } from '../../backend-api/identity-registry/model/organization';
import { EntityDataService } from './entity-data.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationDataService extends EntityDataService {
  myOrganization: Organization;
  
  getList() {
    return [
      {"id":10,"createdAt":1607586546000,"updatedAt":1607589078000,"name":"SMART Navigation Project, KRISO","mrn":"urn:mrn:mcp:org:mcc:smart001","email":"smart@kriso.re.kr","url":"http://www.smartnav.org","address":"1312 beon-gil, Yuseong-daero, Yuseong Gu, Daejeon","country":"Republic of Korea","federationType":"test-idp","certificates":[],"identityProviderAttributes":[]}
    ];
  }

  getMyOrganization() {
    /*
    if (this.myOrganization) {
    	if (this.myOrganization.mrn === this.authService.authState.orgMrn) {
            return Observable.of(this.myOrganization);
        }
    }

    // We create a new observable because we need to save the response for simple caching
    let orgMrn = this.authService.authState.orgMrn;
    return Observable.create(observer => {
      this.organizationApi.getOrganizationUsingGET(orgMrn).subscribe(
        organization => {
          this.myOrganization = organization;
          observer.next(organization);
        },
        err => {
          observer.error(err);
        }
      );
    });
    */
  }
}
