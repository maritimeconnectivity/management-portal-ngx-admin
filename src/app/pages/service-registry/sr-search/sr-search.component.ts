import { ResourceType } from './../../../shared/models/menuType';
import { geojsonToWKT } from '@terraformer/wkt';
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { InstanceDto } from '../../../backend-api/service-registry';
import { InputGeometryComponent } from '../../../shared/input-geometry/input-geometry.component';
import { ColumnForMenu } from '../../../shared/models/columnForMenu';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-sr-search',
  templateUrl: './sr-search.component.html',
  styleUrls: ['./sr-search.component.scss']
})
export class SrSearchComponent implements OnInit {

  @ViewChild('map') geometryMap: InputGeometryComponent;

  testOrgMrn = 'urn:mrn:mcp:org:mcc-test:core';
  geometry = undefined;
  queryString = '';
  instances: InstanceDto[] = [];
  showTables = true;
  contextForAttributes = 'list';
  menuType = ResourceType.Instance;
  isLoading = false;
  settings;
  mySettings = {
    actions: false,
    mode: 'external',
    delete: false,
    columns: ColumnForMenu[this.menuType],
    hideSubHeader: true,
  };
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private router: Router,
    //private searchControllerService: SearchControllerService,
  ) { }

  ngOnInit(): void {
    if(ColumnForMenu.hasOwnProperty(this.menuType.toString())) {
      this.mySettings.columns = Object.assign({}, ...
        Object.entries(ColumnForMenu[this.menuType.toString()]).filter(([k,v]) => Array.isArray(v['visibleFrom']) && v['visibleFrom'].includes(this.contextForAttributes)).map(([k,v]) => ({[k]:v}))
      );
      this.settings = Object.assign({}, this.mySettings);
    }
  }

  onUpdateGeometry = (event: any) => {
    if (this.instances.length > 0) {
      this.clearMap();
    }
    this.geometry = event['data'];
    this.geometryMap.loadGeometry(this.geometry);
    this.search(this.queryString, geojsonToWKT(event['data']));
  }

  search = (queryString: string, wktString: string) => {
    this.isLoading = true;
    /*
    // send a query with given geometry, converted to WKT
    this.searchControllerService.searchInstances(queryString, {}, undefined, wktString)
      .subscribe(res => {
        this.instances = res;
        this.refreshData(this.instances);
        this.isLoading = false;
        const geometries = [];
        this.instances?.forEach(i =>
          geometries.push(i.geometry));
        this.geometryMap.loadGeometries(geometries, this.instances.map(i => i.name));
      });
      */
  }

  onSearch = () => {
    this.search(this.queryString, this.geometry);
  }

  onQueryStringChanged = (event: any) => {
    this.queryString = event.target.value;
  }

  onClear = () => {
    this.clearMap();
  }

  clearMap = () => {
    this.geometryMap?.clearMap();
    this.source.reset();
    this.instances = [];
    this.refreshData(this.instances);
  }

  refreshData(data?: any) {
    if (data) {
      this.source.load(data);
    } else {
      this.source.load([]);
    }
  }

  onEdit(event): void {
    const mrn = this.menuType === ResourceType.Instance ? event.data.id : event.data.mrn;
    this.router.navigate(['/pages/sr/instances',
      mrn ? encodeURIComponent(mrn) : event.data.id],
        { queryParams: { name: event.data.roleName ? event.data.roleName :
            event.data.name ? event.data.name :
            event.data.lastName + ' ' + event.data.firstName,
          version: event.data.instanceVersion,
         }});
    
  }
}
