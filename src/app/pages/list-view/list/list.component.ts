/*
 * Copyright (c) 2022 Maritime Connectivity Platform Consortium
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { MenuTypeNames } from './../../../shared/models/menuType';
import { AuthService } from './../../../auth/auth.service';
import { InstanceControllerService } from './../../../backend-api/service-registry/api/instanceController.service';
import { ServiceControllerService } from './../../../backend-api/identity-registry/api/serviceController.service';
import { DeviceControllerService } from './../../../backend-api/identity-registry/api/deviceController.service';
import { Observable } from 'rxjs/Observable';
import { RoleControllerService } from './../../../backend-api/identity-registry/api/roleController.service';
import { Organization } from './../../../backend-api/identity-registry/model/organization';
import { OrganizationControllerService } from './../../../backend-api/identity-registry/api/organizationController.service';
import { UserControllerService } from './../../../backend-api/identity-registry/api/userController.service';
import { ColumnForMenu } from '../../../shared/models/columnForMenu';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { MenuType, MenuTypeIconNames, EntityTypes } from '../../../shared/models/menuType';
import { NbIconLibraries } from '@nebular/theme';
import { NotifierService } from 'angular-notifier';
import { MmsControllerService, Role, VesselControllerService } from '../../../backend-api/identity-registry';
import { PageEntity } from '../../../backend-api/identity-registry/model/pageEntity';
import { InstanceDto, SearchControllerService } from '../../../backend-api/service-registry';
import { AuthPermission, AuthPermissionForMSR } from '../../../auth/auth.permission';
import { formatData, formatServiceData } from '../../../util/dataFormatter';
import { Entity } from '../../../backend-api/identity-registry/model/entity';
import { hasAdminPermission } from '../../../util/adminPermissionResolver';

const capitalize = (s): string => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1);
}
@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  menuType: MenuType = MenuType.Device;
  title = ' for ';
  contextForAttributes = 'list';
  orgName = 'MCC';
  orgMrn = '';
  iconName = 'circle';
  menuTypeName = '';
  data = [];
  isLoading = false;
  settings;
  mySettings = {
    actions: {
      edit: false,
      position: 'right',
    },
    mode: 'external',
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: ColumnForMenu[this.menuType],
    hideSubHeader: true,
  };
  showTables = true;
  source: LocalDataSource = new LocalDataSource();
  isForServiceForOrg = false;
  isAdmin: boolean = false;

  constructor(private router: Router,
    iconsLibrary: NbIconLibraries,
    private userControllerService: UserControllerService,
    private deviceControllerService: DeviceControllerService,
    private roleControllerService: RoleControllerService,
    private vesselControllerService: VesselControllerService,
    private serviceControllerService: ServiceControllerService,
    private instanceControllerService: InstanceControllerService,
    private searchControllerService: SearchControllerService,
    private mmsControllerService: MmsControllerService,
    private organizationControllerService: OrganizationControllerService,
    private notifierService: NotifierService,
    private authService: AuthService,
    ) {
      iconsLibrary.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });
  }

  ngOnInit(): void {
    const menuTypeString = this.router.url.split('/').pop();
    if (menuTypeString === MenuType.InstanceOfOrg) {
      this.isForServiceForOrg = true;
      this.menuType = MenuType.Instance;
    } else {
      this.menuType = menuTypeString.replace('-', '').substr(0, menuTypeString.length - 1) as MenuType;
    }
    if (Object.values(MenuType).includes(this.menuType)) {
      this.menuTypeName = MenuTypeNames[this.menuType.toString()];
      this.iconName = MenuTypeIconNames[this.menuType.toString()];
      this.orgMrn = this.authService.authState.orgMrn;
    } else {
      this.router.navigate(['**']);
    }

    if (this.authService.authState.rolesLoaded) {
      this.isAdmin = hasAdminPermission(this.menuType, this.authService, false);
    } else {
      this.authService.rolesLoaded.subscribe((mode)=> {
        this.isAdmin = hasAdminPermission(this.menuType, this.authService, false);
      });
    }
    this.fetchValues();
  }

  fetchValues() {
    // filtered with context
    if(ColumnForMenu.hasOwnProperty(this.menuType.toString())) {
      this.mySettings.columns = Object.assign({}, ...
        Object.entries(ColumnForMenu[this.menuType.toString()]).filter(([k,v]) => Array.isArray(v['visibleFrom']) && v['visibleFrom'].includes(this.contextForAttributes)).map(([k,v]) => ({[k]:v}))
      );
      this.settings = Object.assign({}, this.mySettings);
      // Not-approved organization list
      this.title = `${capitalize(this.menuTypeName)} list`;
      this.isLoading = true;

      if (Object.values(MenuType).includes(this.menuType)) {
        if(this.menuType === MenuType.Organization || this.menuType === MenuType.OrgCandidate){
          this.loadDataContent(this.menuType).subscribe(
            res => {this.refreshData(this.formatResponse(res.content)); this.isLoading = false;},
            error => this.notifierService.notify('error', error.message),
          );
        } else if(this.menuType === MenuType.Role){
          this.loadMyOrganization().subscribe(
            resOrg => this.loadRoles(resOrg.mrn).subscribe(
              resData => {this.refreshData(resData); this.isLoading = false;},
              error => this.notifierService.notify('error', error.message),
            ),
            error => this.notifierService.notify('error', error.message),
          );
        } else if(this.menuType === MenuType.Instance || this.menuType === MenuType.InstanceOfOrg){
          this.loadServiceInstances(this.isForServiceForOrg ? this.orgMrn : undefined).subscribe(
            resData => {this.refreshData(this.formatResponseForService(resData)); this.isLoading = false;},
            error => this.notifierService.notify('error', error.message),
          );
        } else {
          this.loadMyOrganization().subscribe(
            resOrg => this.loadDataContent(this.menuType, resOrg.mrn).subscribe(
              res => {this.refreshData(this.formatResponse(res.content)); this.isLoading = false;},
              error => this.notifierService.notify('error', error.message),
            ),
            error => this.notifierService.notify('error', error.message),
          );
        }
      } else {
        this.isLoading = false;
        throw new Error(`There's no such thing as '${this.menuType}DataService'`);
      }
    } else {
      this.isLoading = false;
      throw new Error(`There's no '${this.menuType}DataService' in ColumnForMenu`);
    }
  }

  refreshData(data?: any) {
    if (data) {
      this.source.load(data);
      this.data = data;
    }
    else {
      this.source.load(this.data);
    }
  }

  formatResponse(data: any[]) {
    return data.map(d => formatData(d));
  }

  formatResponseForService(data: any[]) {
    return data.map(d => formatServiceData(d));
  }
  
  onDelete(event): void {
    if (!this.isAdmin) {
      this.notifierService.notify('error', 'You don\'t have right permission');
    } else {
      this.delete(this.menuType, this.orgMrn, event.data.mrn, event.data.instanceVersion, event.data.id);
    }
  }

  delete(menuType: MenuType, orgMrn: string, entityMrn: string, instanceVersion?: string, numberId?: number) {
    let message = 'Are you sure you want to delete?';
    message = EntityTypes.indexOf(this.menuType) >= 0 ?
      message + ' All certificates under this entity will be revoked.' : message;
    if (confirm(message)) {
      this.deleteData(menuType, orgMrn, entityMrn, instanceVersion, numberId).subscribe(
        res => {
          this.notifierService.notify('success', this.menuTypeName + ' has been successfully deleted');
          this.fetchValues();
        },
        err => this.notifierService.notify('error', 'There was error in deletion - ' + err.error.message)
      );
    }
  }

  deleteData = (context: MenuType, orgMrn: string, entityMrn: string, version?: string, numberId?: number): Observable<Entity> => {
    if (context === MenuType.User) {
      return this.userControllerService.deleteUser(orgMrn, entityMrn);
    } else if (context === MenuType.Device) {
      return this.deviceControllerService.deleteDevice(orgMrn, entityMrn);
    } else if (context === MenuType.Vessel) {
      return this.vesselControllerService.deleteVessel(orgMrn, entityMrn);
    } else if (context === MenuType.MMS) {
      return this.mmsControllerService.deleteMMS(orgMrn, entityMrn);
    } else if (context === MenuType.Service && version) {
      return this.serviceControllerService.deleteService(orgMrn, entityMrn, version);
    } else if (context === MenuType.Organization || context === MenuType.OrgCandidate) {
      return this.organizationControllerService.deleteOrg(entityMrn);
    } else if (context === MenuType.Role && numberId) {
      return this.roleControllerService.deleteRole(orgMrn, numberId);
    } else if (context === MenuType.Instance || context === MenuType.InstanceOfOrg) {
      return this.instanceControllerService.deleteInstance(numberId);
    }
    return new Observable();
  }

  onEdit(event): void {
    const mrn = this.menuType === MenuType.Instance ? event.data.id : event.data.mrn;
    this.router.navigate([this.router.url,
      mrn ? encodeURIComponent(mrn) : event.data.id],
        { queryParams: { name: event.data.roleName ? event.data.roleName :
            event.data.name ? event.data.name :
            event.data.lastName + ' ' + event.data.firstName,
          version: event.data.instanceVersion,
         }});
  }

  onAddNew(): void {
    this.router.navigate([this.router.url, 'new']);
  }

  onSearch(event: any) {
    const query = event.srcElement.value;
    if (event && event.srcElement && query.length > 0) {
      this.source.setFilter([
        // fields we want to include in the search
        {
          field: 'id',
          search: query,
        },
        {
          field: 'name',
          search: query,
        },
        {
          field: 'mrn',
          search: query,
        },
      ], false);
    } else {
      this.source.reset();
      this.refreshData();
    }
  }

  loadMyOrganization = ():Observable<Organization> => {
    // fetch organization information from it
    return this.organizationControllerService.getOrganizationByMrn(this.authService.authState.orgMrn);
	}

  loadServiceInstances = (orgMrn?: string):Observable<InstanceDto[]> => {
    return orgMrn ? this.searchControllerService.searchInstances('organizationId:' + orgMrn.split(":").join("\\:") + "*", {}) :
      this.instanceControllerService.getInstances({});
  }

  loadDataContent = (context: MenuType, orgMrn?: string):Observable<PageEntity> => {
    if (context === MenuType.User) {
      return this.userControllerService.getOrganizationUsers(orgMrn);
    } else if (context === MenuType.Device) {
      return this.deviceControllerService.getOrganizationDevices(orgMrn);
    } else if (context === MenuType.Vessel) {
      return this.vesselControllerService.getOrganizationVessels(orgMrn);
    } else if (context === MenuType.MMS) {
      return this.mmsControllerService.getOrganizationMMSes(orgMrn);
    } else if (context === MenuType.Service) {
      return this.serviceControllerService.getOrganizationServices(orgMrn);
    } else if (context === MenuType.Organization) {
      return this.organizationControllerService.getOrganization();
    } else if (context === MenuType.OrgCandidate) {
      return this.organizationControllerService.getUnapprovedOrganizations();
    }
    return new Observable();
  }

  loadRoles = (orgMrn: string): Observable<Role[]> => {
    return this.roleControllerService.getRoles(orgMrn);
  }
}
