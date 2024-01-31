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

import { InstanceControllerService } from './../../../backend-api/service-registry/api/instanceController.service';
import { InstanceDto } from './../../../backend-api/service-registry/model/instanceDto';
import { LuceneQueryOutput } from './../../../shared/lucene-query-input/model/lucene-query-output';
import { SearchParameters } from './../../../backend-api/secom/model/searchParameters';
import { SearchObjectResult } from './../../../backend-api/secom/model/searchObjectResult';
import { SECOMService } from './../../../backend-api/secom/api/sECOM.service';
import { ResourceType } from './../../../shared/models/menuType';
import { geojsonToWKT } from '@terraformer/wkt';
import { Component, OnInit, ViewChild } from '@angular/core';
import { InputGeometryComponent } from '../../../shared/input-geometry/input-geometry.component';
import { ColumnForResource } from '../../../shared/models/columnForMenu';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { srFieldInfo } from './model/sr-instance-query-info';

@Component({
  selector: 'ngx-sr-search',
  templateUrl: './sr-search.component.html',
  styleUrls: ['./sr-search.component.scss']
})
export class SrSearchComponent implements OnInit {

  @ViewChild('map') geometryMap: InputGeometryComponent;
  @ViewChild('luceneQueryStringInput') luceneQueryStringInput;
  @ViewChild('luceneQueryInputComponent') luceneQueryInputComponent;
  queryGeometry: any = {};
  geometries: any[] = [];
  geometryNames: string[] = [];
  searchParams: SearchParameters = {};
  queryString = '';
  freetext = '';
  instances: SearchObjectResult[] = [];
  showTables = true;
  contextForAttributes = 'list';
  menuType = ResourceType.Instance;
  isLoading = false;
  settings;
  mySettings = {
    actions: false,
    mode: 'external',
    delete: false,
    columns: ColumnForResource[this.menuType],
    hideSubHeader: true,
  };
  allInstances: InstanceDto[];
  source: LocalDataSource = new LocalDataSource();
  fieldInfo = srFieldInfo;

  constructor(
    private router: Router,
    private secomSearchController: SECOMService,
    private instanceControllerService: InstanceControllerService,
  ) { }

  ngOnInit(): void {
    if(ColumnForResource.hasOwnProperty(this.menuType.toString())) {
      this.mySettings.columns = Object.assign({}, ...
        Object.entries(ColumnForResource[this.menuType.toString()]).filter(([k,v]) => Array.isArray(v['visibleFrom']) && v['visibleFrom'].includes(this.contextForAttributes)).map(([k,v]) => ({[k]:v}))
      );
      this.settings = Object.assign({}, this.mySettings);

      this.instanceControllerService.getInstances().subscribe(
        instances => this.allInstances = instances,
      );
    }
  }

  onUpdateLuceneQuery = (query: LuceneQueryOutput) => {
    this.queryString = query.queryString ? query.queryString : '';
    this.luceneQueryStringInput.nativeElement.value = this.queryString;

    // get rid of " to convert it to the freetext
    this.freetext = this.queryString.split('"').join('');
    if (this.queryString.length === 0) {
      this.clearAll();
    }
  }

  onUpdateGeometry = (event: any) => {
    this.queryGeometry = event['data'];
    this.search(this.searchParams, geojsonToWKT(this.queryGeometry), this.freetext);
  }

  search = (searchParams: SearchParameters, wktString: string, freetext: string) => {
    this.isLoading = true;
    // send a query with given geometry, converted to WKT
    this.secomSearchController.search({query: searchParams, geometry: wktString, freetext: freetext })
    .subscribe(res => {
      this.instances = res.searchServiceResult;
      this.refreshData(this.instances);
      this.isLoading = false;
      this.geometries = [];
      this.geometryNames = [];
      this.instances?.forEach(i =>
        {
          this.geometries.push(i.geometry);
          this.geometryNames.push(i.name);
        });
      this.geometryMap.loadGeometryOnMap();
    });
  }

  onSearch = () => {
    this.search(this.searchParams, Object.keys(this.queryGeometry).length > 0 ? geojsonToWKT(this.queryGeometry) : '', this.freetext);
  }

  onQueryStringChanged = (event: any) => {
    this.queryString = event.target.value;
    if (this.queryString.length === 0) {
      this.clearAll();
    }
  }

  onClear = () => {
    this.geometries = [];
    this.queryGeometry = {};
    this.searchParams = {};
    this.clearAll();
  }

  clearAll = () => {
    this.clearMap();
    this.luceneQueryInputComponent?.clearInput();
    this.source.reset();
  }

  clearMap = () => {
    this.geometries = [];
    this.geometryNames = [];
    this.source.load([]);
    this.geometryMap?.clearMap();
  }

  refreshData(data?: any) {
    if (data) {
      this.source.load(data);
      if (data.length === 0) {
        this.clearMap();
      }
    } else {
      this.source.load([]);
    }
  }

  onEdit(event): void {
    const mrn = event.data.instanceId;
    if (event && event.data && event.data.instanceId) {
      const instance = this.allInstances.filter((i) => i.instanceId === event.data.instanceId && i.version === event.data.version);
      if (instance.length) {
        this.router.navigate(['/pages/sr/instances',
        instance.pop().id],
          { queryParams: { name: event.data.name,
            version: event.data.instanceVersion,
          }});
      }
    }
  }
}
