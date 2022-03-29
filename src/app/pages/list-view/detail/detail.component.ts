import { CertificateService } from './../../../shared/certificate.service';
import { Organization } from './../../../backend-api/identity-registry/model/organization';
import { Entity } from './../../../backend-api/identity-registry/model/entity';
import { EntityTypes, MenuType, MenuTypeNames } from './../../models/menuType';
import { ColumnForMenu } from '../../models/columnForMenu';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NbIconLibraries } from '@nebular/theme';
import { MenuTypeIconNames } from '../../models/menuType';
import { DeviceControllerService, MmsControllerService, OrganizationControllerService, RoleControllerService, ServiceControllerService, UserControllerService, VesselControllerService } from '../../../backend-api/identity-registry';
import { Observable } from 'rxjs/Observable';
import { AuthInfo } from '../../../auth/model/AuthInfo';
import { NotifierService } from 'angular-notifier';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  name = '';
  isLoading = false;
  menuType = 'device';
  version = '';
  isMyOrgPage = false;
  isForNew = false;
  columnForMenu = ColumnForMenu[this.menuType];
  contextForAttributes = 'detail';
  iconName = 'circle';
  menuTypeName = '';
  isEntity = false;
  entityMrn = '';
  orgMrn = '';
  isUnapprovedorg = false;
  values = {};
  activeCertificates = [];
  revokedCertificates = [];
  formGroup: FormGroup;

  ngOnInit(): void {
    // filtered with context
    this.columnForMenu = Object.entries(ColumnForMenu[this.menuType]).filter(([k,v]) => Array.isArray(v['visibleFrom']) && v['visibleFrom'].includes(this.contextForAttributes));
    
    if (this.isForNew) {
      this.name = 'New ' + this.menuType;
    } else {
      if(ColumnForMenu.hasOwnProperty(this.menuType)) {
        this.isLoading = true;
        if (MenuType.includes(this.menuType)) {
          if(this.menuType === MenuTypeNames.organization){
            this.loadOrgContent(this.entityMrn).subscribe(
              data => {
                this.isLoading = false;
                this.name = data.name;
                this.adjustData(data);
                const splited = this.certificateService.splitByRevokeStatus(data.certificates);
  
                this.activeCertificates = splited.activeCertificates;
                this.revokedCertificates = splited.revokedCertificates;
              },
              error => this.notifierService.notify('error', error.message),
            );
          } else if(this.menuType === MenuTypeNames.unapprovedorg){
            this.isUnapprovedorg = true;
            this.organizationControllerService.getUnapprovedOrganizations().subscribe(
              data => {
                this.isLoading = false;
                this.adjustData(data.content.filter(d => d.mrn === this.entityMrn).pop());
              }
            );
          } else if(this.menuType === MenuTypeNames.role){
            
          } else {
            this.route.queryParams.subscribe(e => this.loadDataContent(this.menuType, AuthInfo.user.organization, this.entityMrn, e.version).subscribe(
              data => {
                this.isLoading = false;
                this.adjustData(data);
                const splited = this.certificateService.splitByRevokeStatus(data.certificates);
  
                this.activeCertificates = splited.activeCertificates;
                this.revokedCertificates = splited.revokedCertificates;
              },
              error => this.notifierService.notify('error', error.message),
            ));
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

    const group = {};
    for (const key in this.columnForMenu) {
      group[this.columnForMenu[key][0]] = [null, this.columnForMenu[key][1].required ? [Validators.required] : []];
    }
    this.formGroup = this.formBuilder.group(group);
  }

  constructor(private route: ActivatedRoute, private router: Router, private location: Location,
    private formBuilder: FormBuilder,
    private iconsLibrary: NbIconLibraries,
    private userControllerService: UserControllerService,
    private deviceControllerService: DeviceControllerService,
    private roleControllerService: RoleControllerService,
    private vesselControllerService: VesselControllerService,
    private serviceControllerService: ServiceControllerService,
    private mmsControllerService: MmsControllerService,
    private organizationControllerService: OrganizationControllerService,
    private certificateService: CertificateService,
    private notifierService: NotifierService) {
      const arrays = this.router.url.split("/");
      this.menuType = arrays[arrays.length-2];
      this.menuType = this.menuType.replace('-', '').substr(0, this.menuType.length-1);
      this.menuTypeName = MenuTypeNames[this.menuType];
      this.iconName = MenuTypeIconNames[this.menuType];
      this.isEntity = EntityTypes.includes(this.menuType);
      this.entityMrn = decodeURIComponent(this.route.snapshot.paramMap.get("id"));
      this.orgMrn = AuthInfo.orgMrn;
      this.isForNew = this.entityMrn === 'new';

      //this is my organization page when it comes with no name
      this.route.queryParams.subscribe(e =>
        {
          this.isMyOrgPage = this.entityMrn === AuthInfo.orgMrn && e.name === undefined;
          this.name = e.name;
        });

      iconsLibrary.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });
  }

  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  submit() {
    console.log(this.columnForMenu);
  }

  onBlur(input_id, value) {
    const id = input_id.replace('input_','');
    this.columnForMenu = this.columnForMenu.map(e => e[0] === id ? [e[0], {...e[1], value: value}] : e);
  }

  loadDataContent = (context: string, orgMrn: string, entityMrn: string, version?: string): Observable<Entity> => {
    if (context === MenuTypeNames.user) {
      return this.userControllerService.getUser(orgMrn, entityMrn);
    } else if (context === MenuTypeNames.device) {
      return this.deviceControllerService.getDevice(orgMrn, entityMrn);
    } else if (context === MenuTypeNames.vessel) {
      return this.vesselControllerService.getVessel(orgMrn, entityMrn);
    } else if (context === MenuTypeNames.mms) {
      return this.mmsControllerService.getMMS(orgMrn, entityMrn);
    } else if (context === MenuTypeNames.service && version) {
      return this.serviceControllerService.getServiceVersion(orgMrn, entityMrn, version);
    }
    return new Observable();
  }

  loadOrgContent = (mrn: string): Observable<Organization> => {
    return this.organizationControllerService.getOrganizationByMrn(mrn);
  }

  adjustData = (data: object) => {
    for(const key in data) {
      const relevant = this.columnForMenu.filter(e => e[0] === key)[0];
      if (relevant) {
        relevant[1].value = relevant[0].endsWith('At') ?
          (new Date(parseInt(data[key]))).toUTCString() : data[key];
      }
    }
  }
}

