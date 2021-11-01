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
import { MenuType, MenuTypeIconNames } from '../../models/entityType';
import { VesselDataService } from '../../../@core/mock/vessel-data.service';
import { NbIconLibraries } from '@nebular/theme';

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

  ngOnInit(): void {
    // filtered with context
    this.mySettings.columns = Object.assign({}, ...
      Object.entries(ColumnForMenu[this.menuType]).filter(([k,v]) => Array.isArray(v['visibleFrom']) && v['visibleFrom'].includes(this.contextForAttributes)).map(([k,v]) => ({[k]:v}))
    );
    this.settings = Object.assign({}, this.mySettings);
    this.title = `${capitalize(this.menuType)} list${this.menuType === 'organization' ? '' : ' for ' + this.organizationName }`;
    console.log(this.menuType);
    if (MenuType.includes(this.menuType) && dataServiceMap.hasOwnProperty(`${this.menuType}DataService`)) {
      this.service = this.injector.get<any>(dataServiceMap[`${this.menuType}DataService`]);
      const data = this.service.getList();
      this.source.load(data);
    } else {
        throw new Error(`There's no such thing as '${this.menuType}DataService'`);
    }
  }

  settings;
  mySettings = {
    mode: 'external',
    edit: {
      editButtonContent: '<i class="nb-menu"></i>',
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
    private orgService: OrganizationDataService, iconsLibrary: NbIconLibraries) {
    this.menuType = this.router.url.split("/").pop();
    this.menuType = this.menuType.substr(0,this.menuType.length-1);
    this.iconName = MenuTypeIconNames[this.menuType];

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
    this.router.navigate([this.router.url, event.data.mrn]);
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

  loadMyOrganization() {
    /*
		this.orgService.getMyOrganization().subscribe(
			organization => {
				this.organization = organization;
			},
			err => {
				this.notifications.generateNotification('Error', 'Error when trying to get organization', MCNotificationType.Error, err);
			}
		);
    */
	}
}
