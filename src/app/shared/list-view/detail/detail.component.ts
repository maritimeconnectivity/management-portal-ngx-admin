import { addLangs, applyTranslateToMenu, applyTranslateToSingleMenu, loadLang } from './../../../util/translateHelper';
/*
 * Copyright (c) 2024 Maritime Connectivity Platform Consortium
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

import { TranslateService } from '@ngx-translate/core';
import { InstanceDto } from '../../../backend-api/service-registry/model/instanceDto';
import { InstanceControllerService } from '../../../backend-api/service-registry/api/instanceController.service';
import { formatVesselToUpload } from '../../../util/dataFormatter';
import { Device } from '../../../backend-api/identity-registry/model/device';
import { Location } from '@angular/common';
import { Organization } from '../../../backend-api/identity-registry/model/organization';
import { EntityTypes, ResourceType, MenuTypeIconNames, MenuTypeNames } from '../../models/menuType';
import { ColumnForResource } from '../../models/columnForMenu';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceControllerService, MMS, MmsControllerService, OrganizationControllerService, Role, RoleControllerService, Service, ServiceControllerService, User, UserControllerService, Vessel, VesselControllerService } from '../../../backend-api/identity-registry';
import { Observable } from 'rxjs/Observable';
import { NotifierService } from 'angular-notifier';
import { AuthService } from '../../../auth/auth.service';
import { ORG_ADMIN_AT_MIR } from '../../app.constants';

import RoleNameEnum = Role.RoleNameEnum;

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  title = '';
  isLoading = false;
  menuType: ResourceType = ResourceType.Device;
  iconName = 'circle';
  instanceVersion = '';
  noBacklink = false;
  isForNew = false;
  columnForMenu = ColumnForResource[this.menuType];
  contextForAttributes = 'detail';
  menuTypeName = '';
  entityMrn = '';
  orgMrn = '';
  values = {};
  activeCertificates = [];
  revokedCertificates = [];
  isEditing = false;
  shortId = '';
  numberId = -1;
  isLoaded = true;
  mrnMask = '';
  isForServiceForOrg = false;
  orgShortId = undefined;
  defaultPermissionForAdminUser = ORG_ADMIN_AT_MIR;

  @ViewChild('editableForm') editableForm;
  @ViewChild('supplementForm') supplementForm;

  constructor(private route: ActivatedRoute, private router: Router,
    private userControllerService: UserControllerService,
    private deviceControllerService: DeviceControllerService,
    private roleControllerService: RoleControllerService,
    private vesselControllerService: VesselControllerService,
    private serviceControllerService: ServiceControllerService,
    private mmsControllerService: MmsControllerService,
    private organizationControllerService: OrganizationControllerService,
    private instanceControllerService: InstanceControllerService,
    private notifierService: NotifierService,
    private authService: AuthService,
    private location: Location,
    public translate: TranslateService,
    ) {
      addLangs(translate);
      loadLang(translate);
  }

  ngOnInit(): void {
    const array = this.router.url.split('/');
    const entityId = array.pop();
    const menuTypeString = array.pop();
    if (menuTypeString === ResourceType.InstanceOfOrg) {
      this.isForServiceForOrg = true;
      this.menuType = ResourceType.Instance;
    } else {
      this.menuType = menuTypeString.replace('-', '').substr(0, menuTypeString.length - 1) as ResourceType;
    }
    this.entityMrn = decodeURIComponent(this.route.snapshot.paramMap.get("id"));
    this.orgMrn = this.authService.authState.orgMrn;
    this.isForNew = this.entityMrn === 'new';
    this.numberId = this.menuType === ResourceType.Instance || this.menuType === ResourceType.Role ?
      parseInt(this.entityMrn) : -1;

    // preventing refresh
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    // this is my organization page when it comes with no name
    this.route.queryParams.subscribe(e =>
    {
      this.noBacklink = e.name === undefined;
      this.title = e.name;
      this.instanceVersion = e.version;
    });

    this.iconName = MenuTypeIconNames[this.menuType.toString()];

    if (this.isForNew) {
      this.isEditing = true;
      this.title = 'New ' + MenuTypeNames[this.menuType];
    } else {
      this.fetchFieldValues();
    }
  }

  cancel() {
    this.location.back();
  }

  settle(result: boolean) {
    this.isLoading = false;
    if (this.editableForm) {
      this.editableForm.settled(result);
    }
  }

  fetchFieldValues() {
    if(ColumnForResource.hasOwnProperty(this.menuType)) {
      this.isLoading = true;
      if (Object.values(ResourceType).includes(this.menuType as ResourceType)) {
        if(this.menuType === ResourceType.OrgCandidate){
          this.organizationControllerService.getUnapprovedOrganizations().subscribe(
            data => {
              this.settle(true);
              this.editableForm.adjustTitle(this.menuType, this.title);
              this.editableForm.adjustData(data.content.filter(d => d.mrn === this.entityMrn).pop());
              this.orgShortId = this.entityMrn.split(':').pop();
            },
            error => {
              this.notifierService.notify('error', error.message);
              this.router.navigateByUrl('/pages/404');
            },
          );
        } else if(this.menuType === ResourceType.Role) {
          const id = parseInt(this.entityMrn);
          this.roleControllerService.getRole(this.orgMrn, id).subscribe(
            data => {
              this.settle(true);
              this.numberId = data.id;
              this.editableForm.adjustTitle(this.menuType, this.title);
              this.editableForm.adjustData(data);
            },
            error => {
              this.notifierService.notify('error', error.message);
              this.router.navigateByUrl('/pages/404');
            },
          )
        } else {
          this.route.queryParams.subscribe(e => this.loadDataContent(this.menuType, this.authService.authState.user.organization, this.entityMrn, e.version, this.numberId).subscribe(
            data => {
              this.settle(true);
              if (this.menuType === ResourceType.User) {
                this.title = (data as User).firstName + " " + (data as User).lastName;
              } else if (this.menuType === ResourceType.Organization) {
                this.title = (data as Organization).name;
              }
              this.editableForm.adjustTitle(this.menuType, this.title);
              this.editableForm.adjustData(data);
            },
            error => {
              this.notifierService.notify('error', error.message);
              this.router.navigateByUrl('/pages/404');
            },
          ));
        }
      } else {
        this.settle(false);
        throw new Error(`${this.translate.instant('error.resource.noDataService')}${this.menuType}`);
      }
    } else {
      this.settle(false);
      throw new Error(`${this.translate.instant('error.resource.noDataService')}${this.menuType}`);
    }
  }

  refreshData() {
    this.fetchFieldValues();
  }

  moveToListPage() {
    this.router.navigate(['../../' + this.menuType + 's'], {relativeTo: this.route});
  }

  delete() {
    let message = this.translate.instant('warning.resource.beforeDeletion');
    message = EntityTypes.indexOf(this.menuType) >= 0 ?
      message + this.translate.instant('warning.resource.beforeRevoke') : message;
    if (confirm(message)) {
      this.deleteData(this.menuType, this.orgMrn, this.entityMrn, this.instanceVersion).subscribe(
        res => {
          this.notifierService.notify('success', this.menuTypeName + this.translate.instant('success.resource.delete'));
          this.moveToListPage();
        },
        err => this.notifierService.notify('error',
          this.translate.instant('error.resource.errorInDeletion') + err.error.message));
    }
  }

  approve() {
    if (this.menuType === ResourceType.OrgCandidate) {
      if (!this.supplementForm.formGroup.valid) {
        this.notifierService.notify('error',
          this.translate.instant('error.resource.missingInformation'));
      } else {
        this.organizationControllerService.approveOrganization(this.entityMrn).subscribe(
          res => {
            this.createAdminRole().subscribe(
              role => {
                this.createAdminUser(this.supplementForm.getFormValue()).subscribe(
                  user => {
                    this.notifierService.notify('success',
                      this.translate.instant('success.resource.approveOrganization'));
                    this.moveToListPage();
                  },
                  err => this.notifierService.notify('error',
                    this.translate.instant('error.resource.approveOrganization.userCreation') + err.error.message),
                );
              },
              err => this.notifierService.notify('error',
               this.translate.instant('error.resource.approveOrganization.roleCreation') + err.error.message),
            );
          },
          err => this.notifierService.notify('error',
            this.translate.instant('error.resource.approveOrganization.reject') + err.error.message),
        );
      }
    }
  }

  createAdminRole() {
    const role: Role = {
      permission: ORG_ADMIN_AT_MIR, // TODO is this correct? Revise when creating the new role-functionality
      roleName: RoleNameEnum.ORGADMIN,
    };
    return this.roleControllerService.createRole(role, this.entityMrn);
  }

  createAdminUser(user: User) {
    if (!user) {
      throw new Error(this.translate.instant('error.resource.noUser'));
    }
    if (!user.permissions || user.permissions.length === 0) {
      user.permissions = ORG_ADMIN_AT_MIR;
    } else if (user.permissions.length > 0 && user.permissions.indexOf(ORG_ADMIN_AT_MIR) < 0) {
      user.permissions = ',' + ORG_ADMIN_AT_MIR;
    }
		return this.createUser(user);
	}

  createUser(user: User) {
    if (!user) {
      throw new Error(this.translate.instant('error.resource.noUser'));
    }
		return this.userControllerService.createUser(user, this.entityMrn);
	}

  submit(body: any) {
    if (this.menuType === ResourceType.Role) {
      this.organizationControllerService.getOrganization1(this.orgMrn).subscribe(
        res => this.submitDataToBackend({ ...body, idOrganization: res.id}),
        err => this.notifierService.notify('error',
          this.translate.instant('error.resource.fetchOrgInfo')),
      );
    } else {
      this.submitDataToBackend(body, body.mrn);
    }
  }

  submitDataToBackend(body: object, mrn?: string) {
    if (this.isForNew) {
      this.registerData(this.menuType, body, this.authService.authState.orgMrn).subscribe(
        res => {
          this.notifierService.notify('success', 'New ' + this.menuType +
            this.translate.instant('success.resource.create'));
          this.settle(true);
          this.moveToListPage();
        },
        err => {
          this.notifierService.notify('error',
            this.translate.instant('error.resource.creationFailed') + err.error.message);
          this.settle(true);
        }
      );
    } else {
      // editing
      this.updateData(this.menuType, body, this.authService.authState.orgMrn, mrn, this.instanceVersion, this.numberId).subscribe(
        res => {
          this.notifierService.notify('success', this.menuType
            + this.translate.instant('success.resource.update'));
          if (this.editableForm) {
            this.editableForm.invertIsEditing();
            this.refreshData();
          }
          this.settle(true);
        },
        err => {
          this.notifierService.notify('error', 
            this.translate.instant('error.resource.updateFailed') + err.error.message);
          this.settle(true);
        }
      );
    }
  }

  registerData = (context: ResourceType, body: object, orgMrn: string): Observable<any> => {
    if (context === ResourceType.User) {
      return this.userControllerService.createUser(body as User, orgMrn);
    } else if (context === ResourceType.Device) {
      return this.deviceControllerService.createDevice(body as Device, orgMrn);
    } else if (context === ResourceType.Vessel) {
      return this.vesselControllerService.createVessel(formatVesselToUpload(body) as Vessel, orgMrn);
    } else if (context === ResourceType.MMS) {
      return this.mmsControllerService.createMMS(body as MMS, orgMrn);
    } else if (context === ResourceType.Service) {
      return this.serviceControllerService.createService(body as Service, orgMrn);
    } else if (context === ResourceType.Organization) {
      return this.organizationControllerService.applyOrganization(body as Organization);
    } else if (context === ResourceType.Role) {
      return this.roleControllerService.createRole(body as Role, orgMrn);
    } else if (context === ResourceType.Instance) {
      return this.instanceControllerService.createInstance(body as InstanceDto);
    }
    return new Observable();
  }

  updateData = (context: ResourceType, body: object, orgMrn: string, entityMrn: string, version?: string, instanceId?: number): Observable<any> => {
    if (context === ResourceType.User) {
      return this.userControllerService.updateUser(body as User, orgMrn, entityMrn);
    } else if (context === ResourceType.Device) {
      return this.deviceControllerService.updateDevice(body as Device, orgMrn, entityMrn);
    } else if (context === ResourceType.Vessel) {
      return this.vesselControllerService.updateVessel(formatVesselToUpload(body) as Vessel, orgMrn, entityMrn);
    } else if (context === ResourceType.MMS) {
      return this.mmsControllerService.updateMMS(body as MMS, orgMrn, entityMrn);
    } else if (context === ResourceType.Service && version) {
      return this.serviceControllerService.updateService(body as Service, orgMrn, entityMrn, version);
    } else if (context === ResourceType.Organization || context === ResourceType.OrgCandidate) {
      return this.organizationControllerService.updateOrganization(body as Organization, entityMrn);
    } else if (context === ResourceType.Role) {
      return this.roleControllerService.updateRole(body as Role, orgMrn, this.numberId);
    } else if (context === ResourceType.Instance) {
      return this.instanceControllerService.updateInstance(Object.assign({}, body, {id: instanceId}) as InstanceDto, instanceId);
    }
    return new Observable();
  }

  deleteData = (context: ResourceType, orgMrn: string, entityMrn: string, version?: string, instanceId?: number): Observable<any> => {
    if (context === ResourceType.User) {
      return this.userControllerService.deleteUser(orgMrn, entityMrn);
    } else if (context === ResourceType.Device) {
      return this.deviceControllerService.deleteDevice(orgMrn, entityMrn);
    } else if (context === ResourceType.Vessel) {
      return this.vesselControllerService.deleteVessel(orgMrn, entityMrn);
    } else if (context === ResourceType.MMS) {
      return this.mmsControllerService.deleteMMS(orgMrn, entityMrn);
    } else if (context === ResourceType.Service && version) {
      return this.serviceControllerService.deleteService(orgMrn, entityMrn, version);
    } else if (context === ResourceType.Organization || context === ResourceType.OrgCandidate) {
      return this.organizationControllerService.deleteOrg(entityMrn);
    } else if (context === ResourceType.Role) {
      return this.roleControllerService.deleteRole(orgMrn, this.numberId);
    } else if (context === ResourceType.Instance) {
      return this.instanceControllerService.deleteInstance(this.numberId);
    }
    return new Observable();
  }

  loadDataContent = (context: ResourceType, orgMrn: string, entityMrn: string, version?: string, instanceId?: number): Observable<any> => {
    if (context === ResourceType.User) {
      return this.userControllerService.getUser(orgMrn, entityMrn);
    } else if (context === ResourceType.Device) {
      return this.deviceControllerService.getDevice(orgMrn, entityMrn);
    } else if (context === ResourceType.Vessel) {
      return this.vesselControllerService.getVessel(orgMrn, entityMrn);
    } else if (context === ResourceType.MMS) {
      return this.mmsControllerService.getMMS(orgMrn, entityMrn);
    } else if (context === ResourceType.Service && version) {
      return this.serviceControllerService.getServiceVersion(orgMrn, entityMrn, version);
    } else if (context === ResourceType.Organization) {
      return this.organizationControllerService.getOrganization1(entityMrn);
    } else if (context === ResourceType.Instance) {
      return this.instanceControllerService.getInstance(instanceId);
    }
    return new Observable();
  }
}
