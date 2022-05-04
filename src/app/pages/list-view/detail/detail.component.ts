import { InstanceDtDto } from './../../../backend-api/service-registry/model/instanceDtDto';
import { FormGroup } from '@angular/forms';
import { InstanceControllerService } from './../../../backend-api/service-registry/api/instanceController.service';
import { formatVesselToUpload } from '../../../util/dataFormatter';
import { Device } from './../../../backend-api/identity-registry/model/device';
import { Location } from '@angular/common';
import { Organization } from './../../../backend-api/identity-registry/model/organization';
import { Entity } from './../../../backend-api/identity-registry/model/entity';
import { EntityTypes, MenuType, MenuTypeIconNames, MenuTypeNames } from '../../../shared/models/menuType';
import { ColumnForMenu } from '../../../shared/models/columnForMenu';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceControllerService, MMS, MmsControllerService, OrganizationControllerService, Role, RoleControllerService, Service, ServiceControllerService, User, UserControllerService, Vessel, VesselControllerService } from '../../../backend-api/identity-registry';
import { Observable } from 'rxjs/Observable';
import { NotifierService } from 'angular-notifier';
import { AuthService } from '../../../auth/auth.service';
import { AuthPermission, AuthPermissionForMSR, PermissionResolver, rolesToPermission } from '../../../auth/auth.permission';
import { ORG_ADMIN_AT_MIR } from '../../../shared/app.constants';

import RoleNameEnum = Role.RoleNameEnum;

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  title = '';
  isLoading = false;
  menuType = 'device';
  iconName = 'circle';
  instanceVersion = '';
  noBacklink = false;
  isForNew = false;
  columnForMenu = ColumnForMenu[this.menuType];
  contextForAttributes = 'detail';
  menuTypeName = '';
  entityMrn = '';
  orgMrn = '';
  canApproveOrg = false;
  values = {};
  activeCertificates = [];
  revokedCertificates = [];
  isEditing = false;
  shortId = '';
  numberId = -1;
  isLoaded = true;
  mrnMask = '';
  isForOrgService = false;
  orgShortId = undefined;
  defaultPermissions = undefined;

  @ViewChild('editableForm') editableForm;
  @ViewChild('supplementForm') supplementForm;

  ngOnInit(): void {
    if (this.isForNew) {
      this.isEditing = true;
    }

    this.iconName = MenuTypeIconNames[this.menuType];
    if (this.isForNew) {
      this.title = 'New ' + this.menuType;
    } else {
      this.fetchFieldValues();
    }
  }

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
    ) {
      const arrays = this.router.url.split("/");
      this.menuType = arrays[arrays.length - 2];
      if (this.menuType === MenuType.InstanceOfOrg) {
        this.isForOrgService = true;
        this.menuType = MenuType.Instance;
      } else {
        this.menuType = this.menuType.replace('-', '').substr(0, this.menuType.length - 1);
      }
      this.entityMrn = decodeURIComponent(this.route.snapshot.paramMap.get("id"));
      this.orgMrn = this.authService.authState.orgMrn;
      this.isForNew = this.entityMrn === 'new';
      this.numberId = this.menuType === MenuType.Instance ? parseInt(this.entityMrn) : -1;
      
      // preventing refresh
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;

      //this is my organization page when it comes with no name
      this.route.queryParams.subscribe(e =>
        {
          this.noBacklink = e.name === undefined;
          this.title = e.name;
          this.instanceVersion = e.version;
        });

      this.roleControllerService.getMyRole(this.authService.authState.orgMrn).subscribe(
        roles => {
          this.authService.authState.permission = rolesToPermission(roles);
          if (this.menuType === MenuType.OrgCandidate &&
            PermissionResolver.canApproveOrg(this.authService.authState.permission)) {
            this.canApproveOrg = true;
          }
      });
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
    if(ColumnForMenu.hasOwnProperty(this.menuType === MenuType.InstanceOfOrg ?
        MenuType.Instance : this.menuType)) {
      this.isLoading = true;
      if (Object.values(MenuType).includes(this.menuType as MenuType)) {
        if(this.menuType === MenuType.OrgCandidate){
          this.organizationControllerService.getUnapprovedOrganizations().subscribe(
            data => {
              this.settle(true);
              this.editableForm.adjustTitle(this.menuType, this.title);
              this.editableForm.adjustData(data.content.filter(d => d.mrn === this.entityMrn).pop());
              this.orgShortId = this.entityMrn.split(':').pop();
              this.defaultPermissions = ORG_ADMIN_AT_MIR;
            },
            error => {
              this.notifierService.notify('error', error.message);
              this.router.navigateByUrl('/pages/404');
            },
          );
        } else if(this.menuType === MenuType.Role) {
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
              if (this.menuType === MenuType.User) {
                this.title = (data as User).firstName + " " + (data as User).lastName;
              } else if (this.menuType === MenuType.Organization) {
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
          throw new Error(`There's no such thing as '${this.menuType}DataService'`);
      }
    } else {
      this.settle(false);
      throw new Error(`There's no '${this.menuType}DataService' in ColumnForMenu`);
    }
  }

  refreshData() {
    this.fetchFieldValues();
  }

  moveToListPage() {
    this.router.navigate(['../../' + this.menuType + 's'], {relativeTo: this.route});
  }

  delete() {
    let message = 'Are you sure you want to delete?';
    message = EntityTypes.indexOf(this.menuType)>=0 ?
      message + ' All certificates under this entity will be revoked.' : message;
    if (confirm(message)) {
      this.deleteData(this.menuType, this.orgMrn, this.entityMrn, this.instanceVersion).subscribe(
        res => {
          this.notifierService.notify('success', this.title + ' has been successfully deleted');
          this.moveToListPage();
        },
        err => this.notifierService.notify('error', 'There was error in deletion - ' + err.message),
      );
    }
  }

  approve() {
    if (this.menuType === MenuType.OrgCandidate) {
      if (!this.supplementForm.formGroup.valid) {
        this.notifierService.notify('error', 'There is missing information of administrator');
      } else {
        this.organizationControllerService.approveOrganization(this.entityMrn).subscribe(
          res => {
            this.createAdminRole().subscribe(
              role => {
                this.createUser(this.supplementForm.getFormValue()).subscribe(
                  user => {
                    this.notifierService.notify('success', 'Organization Approved');
                    this.moveToListPage();
                  },
                  err => this.notifierService.notify('error', 'The organization was approved, but user creation failed. You can go to organizations and try to create the user again later - ' + err.message),
                );
              },
              err => this.notifierService.notify('error', 'The organization was approved, but role creation failed - ' + err.message),
            );
          },
          err => this.notifierService.notify('error', 'The organization is not approved - ' + err.message),
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

  createUser(user: any) {
    if (!user) {
      throw new Error('No user data');
    }
		return this.userControllerService.createUser(user, this.entityMrn);
	}

  submit(body: any) {
    if (this.menuType === 'role') {
      this.organizationControllerService.getOrganizationByMrn(this.orgMrn).subscribe(
        res => this.submitDataToBackend({ ...body, idOrganization: res.id}),
        err => this.notifierService.notify('error', 'Error in fetching organization information'),
      );
    } else {
      this.submitDataToBackend(body, body.mrn);
    }
  }

  submitDataToBackend(body: object, mrn?: string) {
    if (this.isForNew) {
      this.registerData(this.menuType, body, this.authService.authState.orgMrn).subscribe(
        res => {
          this.notifierService.notify('success', 'New ' + this.menuType + ' has been created');
          this.settle(true);
          this.moveToListPage();
        },
        err => {
          this.notifierService.notify('error', 'Creation has failed - ' + err.message);
          this.settle(true);
        }
      );
    } else {
      // editing
      this.updateData(this.menuType, body, this.authService.authState.orgMrn, mrn, this.instanceVersion).subscribe(
        res => {
          this.notifierService.notify('success', this.menuType + ' has been updated');
          if(this.editableForm) {
            this.editableForm.invertIsEditing();
          }
          this.settle(true);
        },
        err => {
          this.notifierService.notify('error', 'Update has failed - ' + err.message);
          this.settle(true);
        }
      );
    }
  }

  registerData = (context: string, body: object, orgMrn: string): Observable<Entity> => {
    if (context === MenuType.User) {
      return this.userControllerService.createUser(body as User, orgMrn);
    } else if (context === MenuType.Device) {
      return this.deviceControllerService.createDevice(body as Device, orgMrn);
    } else if (context === MenuType.Vessel) {
      return this.vesselControllerService.createVessel(body as Vessel, orgMrn);
    } else if (context === MenuType.MMS) {
      return this.mmsControllerService.createMMS(body as MMS, orgMrn);
    } else if (context === MenuType.Service) {
      return this.serviceControllerService.createService(body as Service, orgMrn);
    } else if (context === MenuType.Organization) {
      return this.organizationControllerService.applyOrganization(body as Organization);
    } else if (context === MenuType.Role) {
      return this.roleControllerService.createRole(body as Role, orgMrn);
    } else if (context === MenuType.Instance) {
      return this.instanceControllerService.createInstance(body as InstanceDtDto);
    }
    return new Observable();
  }

  updateData = (context: string, body: object, orgMrn: string, entityMrn: string, version?: string, instanceId?: number): Observable<Entity> => {
    if (context === MenuType.User) {
      return this.userControllerService.updateUser(body as User, orgMrn, entityMrn);
    } else if (context === MenuType.Device) {
      return this.deviceControllerService.updateDevice(body as Device, orgMrn, entityMrn);
    } else if (context === MenuType.Vessel) {
      return this.vesselControllerService.updateVessel(formatVesselToUpload(body) as Vessel, orgMrn, entityMrn);
    } else if (context === MenuType.MMS) {
      return this.mmsControllerService.updateMMS(body as MMS, orgMrn, entityMrn);
    } else if (context === MenuType.Service && version) {
      return this.serviceControllerService.updateService(body as Service, orgMrn, entityMrn, version);
    } else if (context === MenuType.Organization) {
      return this.organizationControllerService.updateOrganization(body as Organization, entityMrn);
    } else if (context === MenuType.Role) {
      return this.roleControllerService.updateRole(body as Role, orgMrn, this.numberId);
    } else if (context === MenuType.Instance) {
      console.log(body as InstanceDtDto);
      return instanceId ? this.instanceControllerService.updateInstance(body as InstanceDtDto, instanceId) :
        this.instanceControllerService.createInstance(body as InstanceDtDto);
    }
    return new Observable();
  }

  deleteData = (context: string, orgMrn: string, entityMrn: string, version?: string, instanceId?: number): Observable<Entity> => {
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
    } else if (context === MenuType.Organization) {
      return this.organizationControllerService.deleteOrg(entityMrn);
    } else if (context === MenuType.Role) {
      return this.roleControllerService.deleteRole(orgMrn, this.numberId);
    } else if (context === MenuType.Instance) {
      return this.instanceControllerService.deleteInstance(instanceId);
    }
    return new Observable();
  }

  loadDataContent = (context: string, orgMrn: string, entityMrn: string, version?: string, instanceId?: number): Observable<Entity> => {
    if (context === MenuType.User) {
      return this.userControllerService.getUser(orgMrn, entityMrn);
    } else if (context === MenuType.Device) {
      return this.deviceControllerService.getDevice(orgMrn, entityMrn);
    } else if (context === MenuType.Vessel) {
      return this.vesselControllerService.getVessel(orgMrn, entityMrn);
    } else if (context === MenuType.MMS) {
      return this.mmsControllerService.getMMS(orgMrn, entityMrn);
    } else if (context === MenuType.Service && version) {
      return this.serviceControllerService.getServiceVersion(orgMrn, entityMrn, version);
    } else if (context === MenuType.Organization) {
      return this.organizationControllerService.getOrganizationByMrn(entityMrn);
    } else if (context === MenuType.Instance) {
      return this.instanceControllerService.getInstance(instanceId);
    }
    return new Observable();
  }

  isAdmin = (): boolean => {
    const context = this.menuType;
    if (context === MenuType.User) {
      return this.authService.authState.hasPermissionInMIR(AuthPermission.UserAdmin);
    } else if (context === MenuType.Device) {
      return this.authService.authState.hasPermissionInMIR(AuthPermission.DeviceAdmin);
    } else if (context === MenuType.Vessel) {
      return this.authService.authState.hasPermissionInMIR(AuthPermission.VesselAdmin);
    } else if (context === MenuType.MMS) {
      return this.authService.authState.hasPermissionInMIR(AuthPermission.MMSAdmin);
    } else if (context === MenuType.Service) {
      return this.authService.authState.hasPermissionInMIR(AuthPermission.ServiceAdmin);
    } else if (context === MenuType.Organization || context === MenuTypeNames.role) {
      return this.authService.authState.hasPermissionInMIR(AuthPermission.OrgAdmin);
    } else if (context === MenuType.Instance) {
      return this.isForOrgService ?
        this.authService.authState.hasPermissionInMSR(AuthPermissionForMSR.OrgServiceAdmin) :
        this.authService.authState.hasPermissionInMSR(AuthPermissionForMSR.MSRAdmin);
    } else {
      return false;
    }
  }
}

