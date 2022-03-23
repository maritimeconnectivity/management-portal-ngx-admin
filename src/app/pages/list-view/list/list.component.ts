import { ServiceControllerService } from './../../../backend-api/identity-registry/api/serviceController.service';
import { DeviceControllerService } from './../../../backend-api/identity-registry/api/deviceController.service';
import { Observable } from 'rxjs/Observable';
import { RoleControllerService } from './../../../backend-api/identity-registry/api/roleController.service';
import { KeycloakService } from 'keycloak-angular';
import { Organization } from './../../../backend-api/identity-registry/model/organization';
import { OrganizationControllerService } from './../../../backend-api/identity-registry/api/organizationController.service';
import { UserControllerService } from './../../../backend-api/identity-registry/api/userController.service';
import { ColumnForMenu } from '../../models/columnForMenu';
import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { ResourceType, MenuType, MenuTypeIconNames, MenuTypeNames } from '../../models/menuType';
import { NbIconLibraries } from '@nebular/theme';
import { NotifierService } from 'angular-notifier';
import { AuthInfo } from '../../../auth/model/AuthInfo';
import { MmsControllerService, Role, VesselControllerService } from '../../../backend-api/identity-registry';
import { PageEntity } from '../../../backend-api/identity-registry/model/pageEntity';

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
  organizationName = 'MCC';
  iconName = 'circle';
  menuTypeName = '';
  data = [];

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

  constructor(private router: Router,
    iconsLibrary: NbIconLibraries,
    private userControllerService: UserControllerService,
    private deviceControllerService: DeviceControllerService,
    private roleControllerService: RoleControllerService,
    private vesselControllerService: VesselControllerService,
    private serviceControllerService: ServiceControllerService,
    private mmsControllerService: MmsControllerService,
    private organizationControllerService: OrganizationControllerService,
    private notifierService: NotifierService,
    ) {
    this.menuType = this.router.url.split("/").pop();
    this.menuType = this.menuType.replace('-', '').substr(0,this.menuType.length-1);
    this.menuTypeName = MenuTypeNames[this.menuType];
    this.iconName = MenuTypeIconNames[this.menuType];
    iconsLibrary.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });
  }

  ngOnInit(): void {
    // filtered with context
    if(ColumnForMenu.hasOwnProperty(this.menuType)) {
      this.mySettings.columns = Object.assign({}, ...
        Object.entries(ColumnForMenu[this.menuType]).filter(([k,v]) => Array.isArray(v['visibleFrom']) && v['visibleFrom'].includes(this.contextForAttributes)).map(([k,v]) => ({[k]:v}))
      );
      this.settings = Object.assign({}, this.mySettings);
      // Not-approved organization list
      this.title = `${capitalize(this.menuTypeName)} list${ResourceType.includes(this.menuType) ? ' for ' + AuthInfo.user.organization : ''}`;
      
      if (MenuType.includes(this.menuType)) {
        if(this.menuType === MenuTypeNames.organization || this.menuType === MenuTypeNames.unapprovedorg){
          this.loadDataContent(this.menuType).subscribe(
            res => this.source.load(res.content),
            error => this.notifierService.notify('error', error.message),
          );
        } else if(this.menuType === MenuTypeNames.role){
          this.loadMyOrganization().subscribe(
            resOrg => this.loadRoles(resOrg.mrn).subscribe(
              resData => this.source.load(resData)
            ),
            error => this.notifierService.notify('error', error.message),
          );
        } else {
          this.loadMyOrganization().subscribe(
            resOrg => this.loadDataContent(this.menuType, resOrg.mrn).subscribe(
              resData => this.source.load(resData.content)
            ),
            error => this.notifierService.notify('error', error.message),
          );
        }
      } else {
          throw new Error(`There's no such thing as '${this.menuType}DataService'`);
      }
    } else {
      throw new Error(`There's no '${this.menuType}DataService' in ColumnForMenu`);
    }
  }

  onDelete(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onEdit(event): void {
    this.router.navigate([this.router.url,
      event.data.mrn ? encodeURIComponent(event.data.mrn) : event.data.id],
        { queryParams: { name: event.data.name ? event.data.name : event.data.lastName + ' ' + event.data.firstName }});
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
