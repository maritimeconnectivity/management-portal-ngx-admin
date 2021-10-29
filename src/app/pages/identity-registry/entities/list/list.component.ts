import { convertTime } from '../../../../util/timeConverter';
import { OrganizationDataService } from '../../../../@core/mock/organization-data.service';
import { UserDataService } from '../../../../@core/mock/user-data.service';
import { DeviceDataService } from '../../../../@core/mock/device-data.service';
import { ColumnForEntity } from '../../../models/columnForEntities';
import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../../@core/data/smart-table';
import { EntityDataService } from '../../../../@core/mock/entity-data.service';
import { ServiceDataService } from '../../../../@core/mock/service-data.service';
import { EntityType, EntityTypeIconNames } from '../../../models/entityType';
import { VesselDataService } from '../../../../@core/mock/vessel-data.service';
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
}

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  entityType: string = 'device';
  title = ' for ';
  contextForAttributes = 'list';
  organizationName = 'MCC';
  iconName = 'circle';

  ngOnInit(): void {
    // filtered with context
    this.mySettings.columns = Object.assign({}, ...
      Object.entries(ColumnForEntity[this.entityType]).filter(([k,v]) => Array.isArray(v['visibleFrom']) && v['visibleFrom'].includes(this.contextForAttributes)).map(([k,v]) => ({[k]:v}))
    );
    this.settings = Object.assign({}, this.mySettings);
    this.title = `${capitalize(this.entityType)} list${this.entityType === 'organization' ? '' : ' for ' + this.organizationName }`;

    if (EntityType.includes(this.entityType) && dataServiceMap.hasOwnProperty(`${this.entityType}DataService`)) {
      this.service = this.injector.get<any>(dataServiceMap[`${this.entityType}DataService`]);
      const data = this.service.getList();
      this.source.load(data);
    } else {
        throw new Error(`There's no such thing as '${this.entityType}DataService'`);
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
    columns: ColumnForEntity[this.entityType],
    hideSubHeader: true,
  };
  showTables = true;
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: EntityDataService, private injector: Injector, private router: Router,
    private orgService: OrganizationDataService, iconsLibrary: NbIconLibraries) {
    this.entityType = this.router.url.split("/").pop();
    this.entityType = this.entityType.substr(0,this.entityType.length-1);
    this.iconName = EntityTypeIconNames[this.entityType];

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
