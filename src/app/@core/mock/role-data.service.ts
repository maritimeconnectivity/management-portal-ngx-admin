import { Injectable } from '@angular/core';
import { EntityDataService } from './entity-data.service';

@Injectable({
  providedIn: 'root'
})
export class RoleDataService extends EntityDataService {
  
  getList() {
    return [{"id":3,"createdAt":1605529440000,"updatedAt":1605529811000,"roleName":"ROLE_SITE_ADMIN","permission":"MCPADMIN","idOrganization":3}];
  }
}
