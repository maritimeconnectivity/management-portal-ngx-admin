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
import { MenuType, MenuTypeIconNames, MenuTypeNames, EntityTypes } from '../../../shared/models/menuType';
import { NbIconLibraries } from '@nebular/theme';
import { NotifierService } from 'angular-notifier';
import { MmsControllerService, Role, VesselControllerService } from '../../../backend-api/identity-registry';
import { PageEntity } from '../../../backend-api/identity-registry/model/pageEntity';
import { InstanceDto, SearchControllerService } from '../../../backend-api/service-registry';
import { AuthPermission, AuthPermissionForMSR } from '../../../auth/auth.permission';
import { formatData, formatServiceData } from '../../../util/dataFormatter';
import { Entity } from '../../../backend-api/identity-registry/model/entity';

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

  menuType: string = 'device';
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
    mode: 'external',
    edit: {
      editButtonContent: '<i class="nb-compose"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
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
    this.menuType = this.router.url.split("/").pop();
    this.menuType = this.menuType.endsWith('s') ? this.menuType.replace('-', '').substr(0,this.menuType.length-1) :
      this.menuType.replace('-', '');
    if (this.menuType === MenuType.InstanceOfOrg) {
      this.isForServiceForOrg = true;
      this.menuType = MenuType.Instance;
    }
    if (Object.values(MenuType).includes(this.menuType as MenuType)) {
      this.menuTypeName = MenuTypeNames[this.menuType];
      this.iconName = MenuTypeIconNames[this.menuType];
      this.orgMrn = this.authService.authState.orgMrn;
      iconsLibrary.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });
    } else {
      this.router.navigate(['**']);
    }
  }

  ngOnInit(): void {
    this.fetchValues();
  }

  fetchValues() {
    // filtered with context
    if(ColumnForMenu.hasOwnProperty(this.menuType)) {
      this.mySettings.columns = Object.assign({}, ...
        Object.entries(ColumnForMenu[this.menuType]).filter(([k,v]) => Array.isArray(v['visibleFrom']) && v['visibleFrom'].includes(this.contextForAttributes)).map(([k,v]) => ({[k]:v}))
      );
      this.settings = Object.assign({}, this.mySettings);
      // Not-approved organization list
      this.title = `${capitalize(this.menuTypeName)} list`;
      this.isLoading = true;

      if (Object.values(MenuType).includes(this.menuType as MenuType)) {
        if(this.menuType === MenuType.Organization || this.menuType === MenuType.OrgCandidate){
          this.loadDataContent(this.menuType).subscribe(
            res => {this.source.load(this.formatResponse(res.content)); this.isLoading = false;},
            error => this.notifierService.notify('error', error.message),
          );
        } else if(this.menuType === MenuType.Role){
          this.loadMyOrganization().subscribe(
            resOrg => this.loadRoles(resOrg.mrn).subscribe(
              resData => {this.source.load(resData); this.isLoading = false;},
              error => this.notifierService.notify('error', error.message),
            ),
            error => this.notifierService.notify('error', error.message),
          );
        } else if(this.menuType === MenuType.Instance || this.menuType === MenuType.InstanceOfOrg){
          this.loadServiceInstances(this.isForServiceForOrg ? this.orgMrn : undefined).subscribe(
            resData => {this.source.load(this.formatResponseForService(resData)); this.isLoading = false;},
            error => this.notifierService.notify('error', error.message),
          );
        } else {
          this.loadMyOrganization().subscribe(
            resOrg => this.loadDataContent(this.menuType, resOrg.mrn).subscribe(
              res => {this.source.load(this.formatResponse(res.content)); this.isLoading = false;},
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

  formatResponse(data: any[]) {
    return data.map(d => formatData(d));
  }

  formatResponseForService(data: any[]) {
    return data.map(d => formatServiceData(d));
  }
  
  onDelete(event): void {
    if (!this.isAdmin()) {
      this.notifierService.notify('error', 'You don\'t have right permission');
    } else {
      this.delete(this.menuType, this.orgMrn, event.data.mrn, event.data.instanceVersion, event.data.id);
    }
  }

  delete(menuType: string, orgMrn: string, entityMrn: string, instanceVersion?: string, roleId?: number) {
    let message = 'Are you sure you want to delete?';
    message = EntityTypes.indexOf(this.menuType) >= 0 ?
      message + ' All certificates under this entity will be revoked.' : message;
    if (confirm(message)) {
      this.deleteData(menuType, orgMrn, entityMrn, instanceVersion).subscribe(
        res => {
          this.notifierService.notify('success', this.menuTypeName + ' has been successfully deleted');
          this.fetchValues();
        },
        err => this.notifierService.notify('error', 'There was error in deletion - ' + err.message)
      );
    }
  }

  deleteData = (context: string, orgMrn: string, entityMrn: string, version?: string, roleId?: number): Observable<Entity> => {
    if (context === MenuTypeNames.user) {
      return this.userControllerService.deleteUser(orgMrn, entityMrn);
    } else if (context === MenuTypeNames.device) {
      return this.deviceControllerService.deleteDevice(orgMrn, entityMrn);
    } else if (context === MenuTypeNames.vessel) {
      return this.vesselControllerService.deleteVessel(orgMrn, entityMrn);
    } else if (context === MenuTypeNames.mms) {
      return this.mmsControllerService.deleteMMS(orgMrn, entityMrn);
    } else if (context === MenuTypeNames.service && version) {
      return this.serviceControllerService.deleteService(orgMrn, entityMrn, version);
    } else if (context === MenuTypeNames.organization) {
      return this.organizationControllerService.deleteOrg(entityMrn);
    } else if (context === MenuTypeNames.role && roleId) {
      return this.roleControllerService.deleteRole(orgMrn, roleId);
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

  onSearch(query: string = '') {
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
  }

  loadMyOrganization = ():Observable<Organization> => {
    // fetch organization information from it
    return this.organizationControllerService.getOrganizationByMrn(this.authService.authState.orgMrn);
	}

  loadServiceInstances = (orgMrn?: string):Observable<InstanceDto[]> => {
    return orgMrn ? this.searchControllerService.searchInstances('organizationId:' + orgMrn.split(":").join("\\:") + "*", {}) :
      this.instanceControllerService.getInstances({});
  }

  loadDataContent = (context: string, orgMrn?: string):Observable<PageEntity> => {
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

  loadRoles = (orgMrn: string):Observable<Role[]> => {
    return this.roleControllerService.getRoles(orgMrn);
  }

  isAdmin = () => {
    const context = this.menuType;
    if (context === MenuTypeNames.user) {
      return this.authService.authState.hasPermissionInMIR(AuthPermission.UserAdmin);
    } else if (context === MenuTypeNames.device) {
      return this.authService.authState.hasPermissionInMIR(AuthPermission.DeviceAdmin);
    } else if (context === MenuTypeNames.vessel) {
      return this.authService.authState.hasPermissionInMIR(AuthPermission.VesselAdmin);
    } else if (context === MenuTypeNames.mms) {
      return this.authService.authState.hasPermissionInMIR(AuthPermission.MMSAdmin);
    } else if (context === MenuTypeNames.service) {
      return this.authService.authState.hasPermissionInMIR(AuthPermission.ServiceAdmin);
    } else if (context === MenuTypeNames.organization || context === MenuTypeNames.role) {
      return this.authService.authState.hasPermissionInMIR(AuthPermission.OrgAdmin);
    } else if (context === MenuTypeNames.instance) {
      return this.isForServiceForOrg ?
        this.authService.authState.hasPermissionInMSR(AuthPermissionForMSR.OrgServiceAdmin) :
        this.authService.authState.hasPermissionInMSR(AuthPermissionForMSR.MSRAdmin);
    } else {
      return false;
    }
  }
}
