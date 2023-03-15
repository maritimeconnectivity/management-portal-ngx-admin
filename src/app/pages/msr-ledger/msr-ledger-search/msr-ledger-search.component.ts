/*
 * Copyright (c) 2023 Maritime Connectivity Platform Consortium
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

import { LuceneQueryOutput } from '../../../shared/lucene-query-input/model/lucene-query-output';
import { ColumnForResource } from '../../../shared/models/columnForMenu';
import { ResourceType } from '../../../shared/models/menuType';
import { InputGeometryComponent } from '../../../shared/input-geometry/input-geometry.component';
import { AppConfig } from '../../../app.config';
import { Contract } from 'web3-eth-contract';
import { Component, OnInit, ViewChild } from '@angular/core';
import Web3 from 'web3';
import {AbiItem} from 'web3-utils/types';
import msrABI from '../../../backend-api/msr-ledger/json/msrContract.json';
import { ServiceInstance } from './model/serviceInstance';
import { LocalDataSource } from 'ng2-smart-table';
import { ledgerFieldInfo } from './model/ledger-instance-query-info';
import { NbDialogService } from '@nebular/theme';

const _ = require("lodash");
const Terraformer = require('@terraformer/spatial');
const TerraformerWKT = require('@terraformer/wkt');
const wktToGeoJSONs = (wktData: string[]): any => {
  return wktData.map(d => TerraformerWKT.wktToGeoJSON(d));
};

const msrContractAddress = '0x6d9588CC38Ee905D51e5624e85af3F6db5F0810a';

@Component({
  selector: 'ngx-msr-ledger-search',
  templateUrl: './msr-ledger-search.component.html',
  styleUrls: ['./msr-ledger-search.component.scss']
})
export class MsrLedgerSearchComponent implements OnInit {
  @ViewChild('map') geometryMap: InputGeometryComponent;
  @ViewChild('luceneQueryStringInput') luceneQueryStringInput;
  @ViewChild('luceneQueryInputComponent') luceneQueryInputComponent;
  showTables = true;
  contract: Contract;
  allInstances: ServiceInstance[] = [];
  queryGeometry: any = {};
  isLoading = false;
  geometries: any[] = [];
  geometryNames: string[] = [];
  searchParams: object = {};
  source: LocalDataSource = new LocalDataSource();
  settings;
  contextForAttributes = 'list';
  menuType = ResourceType.LedgerInstance;
  mySettings = {
    actions: false,
    mode: 'external',
    delete: false,
    columns: ColumnForResource[this.menuType],
    hideSubHeader: true,
  };
  fieldInfo = ledgerFieldInfo;

  constructor(
    private dialogService: NbDialogService,
  ) { }

  ngOnInit(): void {
    if (ColumnForResource.hasOwnProperty(this.menuType.toString())) {
      this.mySettings.columns = Object.assign({}, ...
        Object.entries(ColumnForResource[this.menuType.toString()]).filter(([k,v]) => Array.isArray(v['visibleFrom']) && v['visibleFrom'].includes(this.contextForAttributes)).map(([k,v]) => ({[k]:v}))
      );
      this.settings = Object.assign({}, this.mySettings);

      this.fetchDataFromLedger();
    }
  }

  fetchDataFromLedger = () => {
    const provider = AppConfig.LEDGER_PATH ? AppConfig.LEDGER_PATH : '';

    const web3 = new Web3(provider);
    this.contract = new web3.eth.Contract(msrABI.abi as AbiItem[], msrContractAddress);

    this.getServiceInstances().then((res: ServiceInstance[]) => this.allInstances = res);
  }

  getServiceInstances = async () => {
    return this.contract?.methods.getServiceInstances().call();
  }

  onUpdateLuceneQuery = (query: LuceneQueryOutput) => {
    this.searchParams = query.data;
    if (Object.keys(query).length === 0) {
      this.clearMap();
    }
  }

  onUpdateGeometry = (event: any) => {
    this.queryGeometry = event['data']['geometries'].pop();
    this.search(this.searchParams, this.queryGeometry);
  }

  findIntersects = (instances: ServiceInstance[], query: object): object[] => {
    return instances.filter((d, i) =>
      Terraformer.intersects(TerraformerWKT.wktToGeoJSON(d.coverageArea), query));
  }

  search = (searchParams: object, geoQuery: object) => {
    this.isLoading = true;
    this.onClear();
    const geoFiltered = Object.keys(geoQuery).length > 0 ?
      this.findIntersects(this.allInstances, geoQuery) :
      this.allInstances;
    const attrAndGeoFiltered = Object.keys(searchParams).length > 0 ?
      _.filter(geoFiltered, searchParams) :
      geoFiltered;
    this.refreshData(attrAndGeoFiltered);
    this.isLoading = false;
  }

  onSearch = () => {
    this.search(this.searchParams, this.queryGeometry);
  }

  onClear = () => {
    this.geometries = [];
    this.queryGeometry = {};
    this.searchParams = {};
    this.clearMap();
  }

  clearMap = () => {
    this.geometryMap?.clearMap();
    this.luceneQueryInputComponent?.clearInput();
    this.source.reset();
    this.refreshData([]);
  }

  refreshData(data?: ServiceInstance[]) {
    this.applyDataToMap(data);
    this.applyDataToTable(data);
  }

  getGeoJsonArray = (data: ServiceInstance[]) => {
    return wktToGeoJSONs(data.map(d => d.coverageArea));
  }

  applyDataToMap = (data?: ServiceInstance[]) => {
    this.geometries = this.getGeoJsonArray(data);
    this.geometryNames = data.map(d => d.name + ' from ' + d.msrName);
  }

  applyDataToTable = (data?: ServiceInstance[]) => {
    if (data) {
      this.source.load(data);
    } else {
      this.source.load([]);
    }
  }

  onEdit(event): void {
    /*
    const instance = event.data as ServiceInstance;
    this.dialogService.open(DetailModalComponent, {
      context: {
        instanceMrn: instance.mrn,
        instanceName: instance.name,
        instanceVersion: instance.version,
        msrName: instance.msrName,
        msrUrl: instance.msrUrl,
      },
      closeOnBackdropClick: false,
      closeOnEsc: false,
    });
    */
  }
}
