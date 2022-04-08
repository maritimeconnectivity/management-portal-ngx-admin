import { formatData, formatVesselToUpload } from '../../../util/dataFormatter';
import { Device } from './../../../backend-api/identity-registry/model/device';
import { MrnHelperService } from './../../../util/mrn-helper.service';
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
import { DeviceControllerService, MMS, MmsControllerService, OrganizationControllerService, Role, RoleControllerService, Service, ServiceControllerService, User, UserControllerService, Vessel, VesselControllerService } from '../../../backend-api/identity-registry';
import { Observable } from 'rxjs/Observable';
import { NotifierService } from 'angular-notifier';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { AuthPermission, PermissionResolver, rolesToPermission } from '../../../auth/auth.permission';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  name = '';
  isLoading = false;
  menuType = 'device';
  instanceVersion = '';
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
  canApproveOrg = false;
  values = {};
  activeCertificates = [];
  revokedCertificates = [];
  formGroup: FormGroup;
  isEditing = false;
  shortId = '';
  roleId = -1;
  isLoaded = true;
  isShortIdValid = false;

  ngOnInit(): void {
    if (this.isForNew) {
      this.isEditing = true;
    }
    // filtered with context
    this.columnForMenu = Object.entries(ColumnForMenu[this.menuType]).filter(([k,v]) => 
      Array.isArray(v['visibleFrom']) &&
      v['visibleFrom'].includes(this.contextForAttributes) &&
      (!this.isEditing || (this.isForNew && v['notShowOnEdit'] !== true)));

    this.setFormWithValidators();

    if (this.isForNew) {
      this.name = 'New ' + this.menuType;
      if (this.formGroup.get('mrn')){
        this.formGroup.get('mrn').setValue(this.mrnHelperService.mrnMask(this.menuType));
        this.formGroup.get('mrn').disable();
      }
      this.isLoaded = true;
    } else {
      this.fetchFieldValues();
    }
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
    private notifierService: NotifierService,
    private mrnHelperService: MrnHelperService,
    private authService: AuthService
    ) {
      const arrays = this.router.url.split("/");
      this.menuType = arrays[arrays.length-2];
      this.menuType = this.menuType.replace('-', '').substr(0, this.menuType.length-1);
      this.menuTypeName = MenuTypeNames[this.menuType];
      this.iconName = MenuTypeIconNames[this.menuType];
      this.isEntity = EntityTypes.includes(this.menuType);
      this.entityMrn = decodeURIComponent(this.route.snapshot.paramMap.get("id"));
      this.orgMrn = this.authService.authState.orgMrn;
      this.isForNew = this.entityMrn === 'new';

      // preventing refresh
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;

      //this is my organization page when it comes with no name
      this.route.queryParams.subscribe(e =>
        {
          this.isMyOrgPage = this.entityMrn === this.authService.authState.orgMrn && e.name === undefined;
          this.name = e.name;
          this.instanceVersion = e.version;
        });

      iconsLibrary.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });

      this.roleControllerService.getMyRole(this.authService.authState.orgMrn).subscribe(
        roles => {
          this.authService.authState.permission = rolesToPermission(roles);
          if (PermissionResolver.canApproveOrg(this.authService.authState.permission)){
            this.canApproveOrg = true;
          }
      });
  }

  updateForNewVer() {
    this.formGroup.get('instanceVersion').enable();
    this.isForNew = true;
  }

  settle(result: boolean) {
    this.isLoading = false;
    this.isLoaded = result;
  }

  addShortIdToMrn(shortId: string) {
    const mrn = this.mrnHelperService.mrnMask(this.menuType) + shortId;
    this.formGroup.get('mrn').setValue(mrn);
    this.isShortIdValid = this.validateMrn(mrn);
  }

  validateMrn(mrn: string) {
    if (this.menuTypeName === MenuTypeNames.organization || this.menuTypeName === MenuTypeNames.approveorg) {
      return new RegExp(this.mrnHelperService.mrnMcpIdpRegexForOrg()).test(mrn);
    } else {
      return new RegExp(this.mrnHelperService.mrnMcpIdpRegex()).test(mrn);
    }
  }

  getValidators(field: any) {
    const validators = [];
    if (field[1].required) {
      validators.push(Validators.required);
    }
    if (field[0] === 'email') {
      validators.push(Validators.email);
    }
    if (field[0] === 'mrn') {
      if (this.menuTypeName === MenuTypeNames.organization || this.menuTypeName === MenuTypeNames.approveorg) {
        validators.push(Validators.pattern(this.mrnHelperService.mrnMcpIdpRegexForOrg()));
      } else {
        validators.push(Validators.pattern(this.mrnHelperService.mrnMcpIdpRegex()));
      }
    }
    return validators;
  }

  invertIsEditing() {
    this.isEditing = !this.isEditing;
  }

  fetchFieldValues() {
    if(ColumnForMenu.hasOwnProperty(this.menuType)) {
      this.isLoading = true;
      if (MenuType.includes(this.menuType)) {
        if(this.menuType === MenuTypeNames.organization){
          this.loadOrgContent(this.entityMrn).subscribe(
            data => {
              this.settle(true);
              this.name = data.name;
              this.adjustData(data);
              const splited = this.certificateService.splitByRevokeStatus(data.certificates);

              this.activeCertificates = splited.activeCertificates;
              this.revokedCertificates = splited.revokedCertificates;
            },
            error => {
              this.notifierService.notify('error', error.message);
              this.router.navigateByUrl('/pages/404');
            },
          );
        } else if(this.menuType === MenuTypeNames.unapprovedorg){
          this.isUnapprovedorg = true;
          this.organizationControllerService.getUnapprovedOrganizations().subscribe(
            data => {
              this.settle(true);
              this.adjustData(data.content.filter(d => d.mrn === this.entityMrn).pop());
            },
            error => {
              this.notifierService.notify('error', error.message);
              this.router.navigateByUrl('/pages/404');
            },
          );
        } else if(this.menuType === MenuTypeNames.role) {
          const id = parseInt(this.entityMrn);
          this.roleControllerService.getRole(this.orgMrn, id).subscribe(
            data => {
              this.settle(true);
              this.roleId = data.id;
              this.adjustData(data);
            },
            error => {
              this.notifierService.notify('error', error.message);
              this.router.navigateByUrl('/pages/404');
            },
          )
        } else {
          this.route.queryParams.subscribe(e => this.loadDataContent(this.menuType, this.authService.authState.user.organization, this.entityMrn, e.version).subscribe(
            data => {
              this.settle(true);
              this.adjustData(data);
              const splited = this.certificateService.splitByRevokeStatus(data.certificates);

              this.activeCertificates = splited.activeCertificates;
              this.revokedCertificates = splited.revokedCertificates;
            },
            error => {
              this.notifierService.notify('error', error.message);
              this.router.navigateByUrl('/pages/404');
            },
          ));
        }
      } else {
        this.settle(false);
          throw new Error(`There's no such thing as '${this.menuType}DataService'`);
      }
    } else {
      this.settle(false);
      throw new Error(`There's no '${this.menuType}DataService' in ColumnForMenu`);
    }
  }

  refreshData() {
    this.fetchFieldValues();
  }

  moveToListPage() {
    this.router.navigate(['../../' + this.menuType + 's'], {relativeTo: this.route});
  }

  delete() {
    if (confirm('Are you sure you want to delete?')) {
      this.deleteData(this.menuType, this.orgMrn, this.entityMrn, this.instanceVersion).subscribe(
        res => {
          this.notifierService.notify('success', this.name + ' has been successfully deleted');
          this.moveToListPage();
        },
        err => this.notifierService.notify('error', 'There was error in deletion - ' + err.message)
      );
    }
  }

  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  submit() {
    const body = { ...this.formGroup.value};
    if (this.menuType === 'role') {
      this.loadOrgContent(this.orgMrn).subscribe(
        res => this.submitDateToBackend({ ...body, idOrganization: res.id}),
        err => this.notifierService.notify('error', 'Error in fetching organization information'),
      );
    } else {
      this.submitDateToBackend({...body, mrn: this.formGroup.get('mrn').value}, this.formGroup.get('mrn').value);
    }
    this.isLoading = true;
  }

  submitDateToBackend(body: object, mrn?: string) {
    if (this.isForNew) {
      this.registerData(this.menuType, body, this.authService.authState.orgMrn).subscribe(
        res => {
          this.notifierService.notify('success', 'New ' + this.menuType + ' has been created');
          this.isLoading = false;
          this.moveToListPage();
        },
        err => {
          this.notifierService.notify('error', 'Creation has failed - ' + err.message);
          this.isLoading = false;
        }
      );
    } else {
      // editing
      this.updateData(this.menuType, body, this.authService.authState.orgMrn, mrn, this.instanceVersion).subscribe(
        res => {
          this.notifierService.notify('success', this.menuType + ' has been updated');
          this.isLoading = false;
          this.isEditing = false;
        },
        err => {
          this.notifierService.notify('error', 'Update has failed - ' + err.message);
          this.isLoading = false;
        }
      );
    }
  }

  registerData = (context: string, body: object, orgMrn: string): Observable<Entity> => {
    if (context === MenuTypeNames.user) {
      return this.userControllerService.createUser(body as User, orgMrn);
    } else if (context === MenuTypeNames.device) {
      return this.deviceControllerService.createDevice(body as Device, orgMrn);
    } else if (context === MenuTypeNames.vessel) {
      return this.vesselControllerService.createVessel(body as Vessel, orgMrn);
    } else if (context === MenuTypeNames.mms) {
      return this.mmsControllerService.createMMS(body as MMS, orgMrn);
    } else if (context === MenuTypeNames.service) {
      return this.serviceControllerService.createService(body as Service, orgMrn);
    } else if (context === MenuTypeNames.organization) {
      return this.organizationControllerService.applyOrganization(body as Organization);
    } else if (context === MenuTypeNames.role) {
      return this.roleControllerService.createRole(body as Role, orgMrn);
    }
    return new Observable();
  }

  updateData = (context: string, body: object, orgMrn: string, entityMrn: string, version?: string): Observable<Entity> => {
    if (context === MenuTypeNames.user) {
      return this.userControllerService.updateUser(body as User, orgMrn, entityMrn);
    } else if (context === MenuTypeNames.device) {
      return this.deviceControllerService.updateDevice(body as Device, orgMrn, entityMrn);
    } else if (context === MenuTypeNames.vessel) {
      return this.vesselControllerService.updateVessel(formatVesselToUpload(body) as Vessel, orgMrn, entityMrn);
    } else if (context === MenuTypeNames.mms) {
      return this.mmsControllerService.updateMMS(body as MMS, orgMrn, entityMrn);
    } else if (context === MenuTypeNames.service && version) {
      return this.serviceControllerService.updateService(body as Service, orgMrn, entityMrn, version);
    } else if (context === MenuTypeNames.organization) {
      return this.organizationControllerService.updateOrganization(body as Organization, entityMrn);
    } else if (context === MenuTypeNames.role) {
      return this.roleControllerService.updateRole(body as Role, orgMrn, this.roleId);
    }
    return new Observable();
  }

  deleteData = (context: string, orgMrn: string, entityMrn: string, version?: string): Observable<Entity> => {
    if (context === MenuTypeNames.user) {
      return this.userControllerService.deleteUser(orgMrn, entityMrn);
    } else if (context === MenuTypeNames.device) {
      return this.deviceControllerService.deleteDevice(orgMrn, entityMrn);
    } else if (context === MenuTypeNames.vessel) {
      return this.vesselControllerService.deleteVessel(orgMrn, entityMrn);
    } else if (context === MenuTypeNames.mms) {
      return this.mmsControllerService.deleteMMS(orgMrn, entityMrn);
    } else if (context === MenuTypeNames.service && version) {
      return this.serviceControllerService.deleteService(orgMrn, entityMrn, version);
    } else if (context === MenuTypeNames.organization) {
      return this.organizationControllerService.deleteOrg(entityMrn);
    } else if (context === MenuTypeNames.role) {
      return this.roleControllerService.deleteRole(orgMrn, this.roleId);
    }
    return new Observable();
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

  setFormWithValidators = () => {
    const group = {};
    for (const key in this.columnForMenu) {
      group[this.columnForMenu[key][0]] = [null, this.getValidators(this.columnForMenu[key])];
    }
    this.formGroup = this.formBuilder.group(group);
  }

  adjustData = (rawData: object) => {
    const data = formatData(rawData);
    for(const key in data) {
      const relevant = this.columnForMenu.filter(e => e[0] === key)[0];
      if (relevant) {
        if (relevant[1].immutable === true) {
          this.formGroup.get(relevant[0]).disable();
        }
        if (this.menuType !== 'role' && relevant[0] === 'mrn') {
          this.shortId = this.mrnHelperService.shortIdFromMrn(data[key]);
          const mrn = this.mrnHelperService.mrnMask(this.menuType) + this.shortId;
          this.isShortIdValid = this.validateMrn(mrn);
          this.formGroup.get(relevant[0]).setValue(mrn);
        } else {
          this.formGroup.get(relevant[0]).setValue(data[key]);
        }
      }
    }
  }

  isAdmin = (): boolean => {
    const context = this.menuType;
    if (context === MenuTypeNames.user) {
      return this.authService.authState.hasPermission(AuthPermission.UserAdmin);
    } else if (context === MenuTypeNames.device) {
      return this.authService.authState.hasPermission(AuthPermission.DeviceAdmin);
    } else if (context === MenuTypeNames.vessel) {
      return this.authService.authState.hasPermission(AuthPermission.VesselAdmin);
    } else if (context === MenuTypeNames.mms) {
      return this.authService.authState.hasPermission(AuthPermission.MMSAdmin);
    } else if (context === MenuTypeNames.service) {
      return this.authService.authState.hasPermission(AuthPermission.ServiceAdmin);
    } else if (context === MenuTypeNames.organization || context === MenuTypeNames.role) {
      return this.authService.authState.hasPermission(AuthPermission.OrgAdmin);
    } else {
      return false;
    }
  }
}

