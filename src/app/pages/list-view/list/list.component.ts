import { ServiceControllerService } from './../../../backend-api/identity-registry/api/serviceController.service';
import { AgentControllerService } from './../../../backend-api/identity-registry/api/agentController.service';
import { PageDevice } from './../../../backend-api/identity-registry/model/pageDevice';
import { DeviceControllerService } from './../../../backend-api/identity-registry/api/deviceController.service';
import { Observable } from 'rxjs/Observable';
import { RoleControllerService } from './../../../backend-api/identity-registry/api/roleController.service';
import { KeycloakService } from 'keycloak-angular';
import { Organization } from './../../../backend-api/identity-registry/model/organization';
import { OrganizationControllerService } from './../../../backend-api/identity-registry/api/organizationController.service';
import { UserControllerService } from './../../../backend-api/identity-registry/api/userController.service';
import { InstanceDataService } from './../../../@core/mock/instance-data.service';
import { RoleDataService } from './../../../@core/mock/role-data.service';
import { convertTime } from '../../../util/timeConverter';
import { OrganizationDataService } from '../../../@core/mock/organization-data.service';
import { UserDataService } from '../../../@core/mock/user-data.service';
import { DeviceDataService } from '../../../@core/mock/device-data.service';
import { ColumnForMenu } from '../../models/columnForMenu';
import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { EntityDataService } from '../../../@core/mock/entity-data.service';
import { ServiceDataService } from '../../../@core/mock/service-data.service';
import { ResourceType, MenuType, MenuTypeIconNames, MenuTypeNames } from '../../models/menuType';
import { VesselDataService } from '../../../@core/mock/vessel-data.service';
import { NbIconLibraries } from '@nebular/theme';
import { ApproveOrgDataService } from '../../../@core/mock/approve-org-data.service';
import { ApproveSvcDataService } from '../../../@core/mock/approve-svc-data.service';
import { NotifierService } from 'angular-notifier';
import { AuthInfo } from '../../../auth/model/AuthInfo';
import { MmsControllerService, PageUser, Role, VesselControllerService } from '../../../backend-api/identity-registry';
import { PageEntity } from '../../../backend-api/identity-registry/model/pageEntity';

const capitalize = (s): string => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const dataServiceMap = {
  serviceDataService: ServiceDataService,
  vesselDataService: VesselDataService,
  deviceDataService: DeviceDataService,
  userDataService: UserDataService,
  organizationDataService: OrganizationDataService,
  roleDataService: RoleDataService,
  instanceDataService: InstanceDataService,
  approveorgDataService: ApproveOrgDataService,
  approvesvcDataService: ApproveSvcDataService,
  userControllerService: UserControllerService,
};

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  menuType: string = 'device';
  title = ' for ';
  contextForAttributes = 'list';
  organizationName = 'MCC';
  iconName = 'circle';
  menuTypeName = '';
  data = [];
  readonly notifier: NotifierService;

  ngOnInit(): void {
    // filtered with context
    if(ColumnForMenu.hasOwnProperty(this.menuType)) {
      this.mySettings.columns = Object.assign({}, ...
        Object.entries(ColumnForMenu[this.menuType]).filter(([k,v]) => Array.isArray(v['visibleFrom']) && v['visibleFrom'].includes(this.contextForAttributes)).map(([k,v]) => ({[k]:v}))
      );
      this.settings = Object.assign({}, this.mySettings);
      // Not-approved organization list
      this.title = `${capitalize(this.menuTypeName)} list${ResourceType.includes(this.menuType) ? ' for ' + this.organizationName : ''}`;
      
      if (MenuType.includes(this.menuType) && dataServiceMap.hasOwnProperty(`${this.menuType}DataService`)) {
        this.service = this.injector.get<any>(dataServiceMap[`${this.menuType}DataService`]);
        const data = this.service.getList();

        if(this.menuType === MenuTypeNames.organization || this.menuType === MenuTypeNames.unapprovedorg){
          this.loadDataContent(this.menuType).subscribe(
            res => this.source.load(res.content),
            error => this.notifier.notify('error', error.message),
          );
        } else if(this.menuType === MenuTypeNames.role){
          this.loadMyOrganization().subscribe(
            resOrg => this.loadRoles(resOrg.mrn).subscribe(
              resData => this.source.load(resData)
            ),
            error => this.notifier.notify('error', error.message),
          );
        } else {
          this.loadMyOrganization().subscribe(
            resOrg => this.loadDataContent(this.menuType, resOrg.mrn).subscribe(
              resData => this.source.load(resData.content)
            ),
            error => this.notifier.notify('error', error.message),
          );
        }
      } else {
          throw new Error(`There's no such thing as '${this.menuType}DataService'`);
      }
    } else {
      throw new Error(`There's no '${this.menuType}DataService' in ColumnForMenu`);
    }
  }

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

  constructor(private service: EntityDataService, private injector: Injector, private router: Router,
    iconsLibrary: NbIconLibraries,
    private userControllerService: UserControllerService,
    private deviceControllerService: DeviceControllerService,
    private roleControllerService: RoleControllerService,
    private vesselControllerService: VesselControllerService,
    private serviceControllerService: ServiceControllerService,
    private mmsControllerService: MmsControllerService,
    private organizationControllerService: OrganizationControllerService,
    private notifierService: NotifierService,
    private keycloakService: KeycloakService,
    ) {
    this.menuType = this.router.url.split("/").pop();
    this.menuType = this.menuType.replace('-', '').substr(0,this.menuType.length-1);
    this.menuTypeName = MenuTypeNames[this.menuType];
    this.iconName = MenuTypeIconNames[this.menuType];
    this.notifier = notifierService;
    iconsLibrary.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });
  }

  onDelete(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onEdit(event): void {
    this.router.navigate([this.router.url, event.data.mrn ? event.data.mrn : event.data.id]);
  }

  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'id',
        search: query
      },
      {
        field: 'name',
        search: query
      },
      {
        field: 'mrn',
        search: query
      },
    ], false);
  }

  loadMyOrganization = ():Observable<Organization> => {
    // fetch organization information from it
    return this.organizationControllerService.getOrganizationByMrn(AuthInfo.orgMrn);
	}

  loadDataContent = (context: string, orgMrn?: string):Observable<PageEntity> => {
    if (context === MenuTypeNames.user) {
      return this.userControllerService.getOrganizationUsers(orgMrn);
    } else if (context === MenuTypeNames.device) {
      return this.deviceControllerService.getOrganizationDevices(orgMrn);
    } else if (context === MenuTypeNames.vessel) {
      return this.vesselControllerService.getOrganizationVessels(orgMrn);
    } else if (context === MenuTypeNames.mms) {
      return this.mmsControllerService.getOrganizationMMSes(orgMrn);
    } else if (context === MenuTypeNames.service) {
      return this.serviceControllerService.getOrganizationServices(orgMrn);
    } else if (context === MenuTypeNames.organization) {
      return this.organizationControllerService.getOrganization();
    } else if (context === MenuTypeNames.unapprovedorg) {
      return this.organizationControllerService.getUnapprovedOrganizations();
    }
    return new Observable();
  }

  loadRoles = (orgMrn: string):Observable<Role[]> => {
    return this.roleControllerService.getRoles(orgMrn);
  }
}
