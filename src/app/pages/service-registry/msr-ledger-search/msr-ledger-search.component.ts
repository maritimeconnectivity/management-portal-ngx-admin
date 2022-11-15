import { InputGeometryComponent } from './../../../shared/input-geometry/input-geometry.component';
import { geojsonToWKT } from '@terraformer/wkt';
import { AppConfig } from './../../../app.config';
import { Contract } from 'web3-eth-contract';
import { Component, OnInit, ViewChild } from '@angular/core';
import Web3 from 'web3';
import {AbiItem} from 'web3-utils/types';
import msrABI from '../../../backend-api/msr-ledger/json/msrContract.json';
import { ServiceInstance } from './model/serviceInstance';
import { LocalDataSource } from 'ng2-smart-table';

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
  instances: ServiceInstance[] = [];
  queryGeometry: any;
  isLoading = false;
  geometries: any[] = [];
  geometryNames: string[] = [];
  source: LocalDataSource = new LocalDataSource();

  constructor() { }

  ngOnInit(): void {
    const provider = AppConfig.LEDGER_PATH ? AppConfig.LEDGER_PATH : '';

    const web3 = new Web3(provider);
    this.contract = new web3.eth.Contract(msrABI.abi as AbiItem[], msrContractAddress);

    this.getServiceInstances().then((res: ServiceInstance[]) => this.instances = res);
/*
    contract.methods.somFunc().send({from: ....})
    .on('receipt', function(){
        ...
    });

    const web3Provider = new Web3.providers.HttpProvider(provider);
    const web3 = new Web3(web3Provider);
    web3.eth.Contract(msrABI, msrContractAddress);
    web3.eth.getBlockNumber().then((result) => {
      console.log("Latest Ethereum Block is ",result);
    });
    */
  }

  getServiceInstances = async () => {
    return this.contract?.methods.getServiceInstances().call();
  }

  onUpdateGeometry = (event: any) => {
    this.queryGeometry = event['data'];
    this.search({}, geojsonToWKT(this.queryGeometry));
  }

  search = (searchParams: object, wktString: string) => {
    this.isLoading = true;
    // send a query with given geometry, converted to WKT
    /*
    this.secomSearchController.search({query: searchParams, geometry: wktString, freetext: freetext })
    .subscribe(res => {
      this.instances = res;
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
    */
  }

  onSearch = () => {
    this.search({}, this.queryGeometry ? geojsonToWKT(this.queryGeometry) : '');
  }

  onClear = () => {
    this.geometries = [];
    this.queryGeometry = undefined;
    this.clearMap();
  }

  clearMap = () => {
    this.geometryMap?.clearMap();
    this.luceneQueryInputComponent?.clearInput();
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
    const mrn = event.data.instanceId;
    if (event && event.data && event.data.instanceId) {
      
    }
  }

  onUpdateLuceneQuery = (query: any) => {
    
    if (!query.queryString || query.queryString.length === 0) {
      this.clearMap();
    }
  }
}
