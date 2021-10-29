import { convertTime } from '../../../util/timeConverter';
import { OrganizationDataService } from '../../../@core/mock/organization-data.service';
import { UserDataService } from '../../../@core/mock/user-data.service';
import { DeviceDataService } from '../../../@core/mock/device-data.service';
import { ColumnForEntity } from '../../models/columnForEntities';
import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { EntityDataService } from '../../../@core/mock/entity-data.service';
import { ServiceDataService } from '../../../@core/mock/service-data.service';
import { EntityType, EntityTypeIconNames } from '../../models/entityType';
import { VesselDataService } from '../../../@core/mock/vessel-data.service';
import { NbIconLibraries } from '@nebular/theme';
import { ColumnForRole } from '../../models/columnForRole';
import { RoleDataService } from '../../../@core/mock/role-data.service';

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
  selector: 'ngx-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})

export class RoleComponent implements OnInit {

  title = ' for ';
  contextForAttributes = 'list';
  organizationName = 'MCC';
  iconName = 'id-badge';

  ngOnInit(): void {
    this.title = `Role list for ${this.organizationName}`;
    const data = this.service.getList();
    this.source.load(data);
  }

  settings = {
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
    columns: ColumnForRole,
    hideSubHeader: true,
  };
  showTables = true;
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: RoleDataService, private injector: Injector, private router: Router,
    private orgService: OrganizationDataService, iconsLibrary: NbIconLibraries) {
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
    this.router.navigate([this.router.url, event.data.id]);
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
