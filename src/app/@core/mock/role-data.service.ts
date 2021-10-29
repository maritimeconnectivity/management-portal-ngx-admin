import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleDataService {
  
  getList() {
    return [{"id":3,"createdAt":1605529440000,"updatedAt":1605529811000,"roleName":"ROLE_SITE_ADMIN","permission":"MCPADMIN","idOrganization":3}];
  }
}
