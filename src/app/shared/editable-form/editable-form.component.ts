import { convertTime } from './../../util/timeConverter';
import { XmlEditDialogComponent } from './../xml-edit-dialog/xml-edit-dialog.component';
import { AuthService } from './../../auth/auth.service';
import { OrganizationControllerService } from './../../backend-api/identity-registry/api/organizationController.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatData } from '../../util/dataFormatter';
import { MrnHelperService } from '../../util/mrn-helper.service';
import { ColumnForMenu } from '../models/columnForMenu';
import { EntityTypes, MenuType, MenuTypeNames } from '../models/menuType';
import { NbDialogService, NbIconLibraries } from '@nebular/theme';
import { CertificateService } from '../certificate.service';
import { InstanceDto, XmlDto } from '../../backend-api/service-registry';
import { Any } from 'asn1js';
import { hasAdminPermission } from '../../util/adminPermissionResolver';

const notUndefined = (anyValue: any) => typeof anyValue !== 'undefined';
@Component({
  selector: 'ngx-editable-form',
  templateUrl: './editable-form.component.html',
  styleUrls: ['./editable-form.component.scss']
})
export class EditableFormComponent implements OnInit {

  @Input() menuType: MenuType;
  @Input() instanceVersion: string;
  @Input() isForNew: boolean;
  @Input() canApproveOrg: boolean;
  @Input() entityMrn: string;
  @Input() orgMrn: string;
  @Input() title: string;
  @Input() iconName: string;
  @Input() isLoading: boolean;
  @Input() isLoaded: boolean;
  @Input() showButtons: boolean;
  @Input() hasHeader: boolean;
  @Input() orgShortId: string;
  @Input() defaultPermissions: string;

  @Output() onCancel = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onSubmit = new EventEmitter<any>();
  @Output() onApprove = new EventEmitter<any>();
  @Output() onRefresh = new EventEmitter<any>();

  isAdmin = false;
  loadedData = {};
  nonStringForm = {};
  fetchList = ['mrn', 'version', 'orgMrn', 'adminMrn', 'instanceId', 'organizationId', 'implementsServiceDesign', 'email', 'orgEmail', 'adminEmail', 'instanceVersion'];
  isEditing = false;
  isEntity = false;
  columnForMenu: any;
  fieldVisibility = {};
  formGroup: FormGroup;
  shortId = '';
  roleId = -1;
  contextForAttributes = 'detail';
  menuTypeName = '';
  activeCertificates = [];
  revokedCertificates = [];
  isServiceInstance = false;
  geometry = {};
  
  constructor(
    private mrnHelperService: MrnHelperService,
    private formBuilder: FormBuilder,
    private iconsLibrary: NbIconLibraries,
    private certificateService: CertificateService,
    private dialogService: NbDialogService,
    private authService: AuthService,
  ) {
    iconsLibrary.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });
  }

  needShortId = (field: string) => {
    return this.getShortIdType(field) !== undefined;
  }

  getShortIdType = (field: string) => {
    return this.columnForMenu[field] ? this.columnForMenu[field].shortIdType : undefined;
  }

  ngOnInit(): void {
    this.setForm();

    if (this.isForNew) {
      this.isEditing = true;
      this.setFormFieldVisibility();
      Object.keys(this.formGroup.controls).forEach(field => {
        if (this.needShortId(field)) {
          this.formGroup.get(field).setValue( this.mrnHelperService.mrnMask( this.getShortIdType(field), this.orgShortId) );
          this.formGroup.get(field).disable();
        }
      });
      if (this.defaultPermissions) {
        this.formGroup.get('permissions').setValue(this.defaultPermissions);
      }
      if (this.menuType === MenuType.Instance) {
        this.formGroup.get('organizationId').setValue(AuthService.staticAuthInfo.orgMrn);
        this.formGroup.get('organizationId').disable();
        Object.entries(ColumnForMenu[this.menuType]).map(([key, value]) => 
        {
          if ((value as any).type === 'stringArray') {
            this.loadedData[key] = [];
          }
        });
      }
      // check admin permission
      if (this.authService.authState.rolesLoaded) {
        this.setIsAdmin();
      } else {
        this.authService.rolesLoaded.subscribe((mode)=> {
          this.setIsAdmin();
        });
      }
      this.settled(true);
    }
  }

  setForm = () => {
    // filtered with context
    this.columnForMenu = {};
    Object.entries(ColumnForMenu[this.menuType]).map(([k,v]) => 
      {if (Array.isArray(v['visibleFrom']) && // array type checking
      v['visibleFrom'].includes(this.contextForAttributes) && // context filtering, either detail or list
      (!this.isEditing || (this.isForNew && v['notShowOnEdit'] !== true)))
        this.columnForMenu[k] = v;}
      );

    this.setFormWithValidators();
  }

  setFormFieldVisibility = (data?: any) => {
    const menuWithOptions = [];
    Object.entries(this.columnForMenu).forEach(([key, menu]) =>
    {
      this.fieldVisibility[key] = (menu as any).notShowOnEdit ? !(menu as any).notShowOnEdit : true;
      if ((menu as any).options) {
        menuWithOptions.push({key: key, value: (menu as any).options});
      }
    });
    // matched data with preset activates corresponding field in menu
    if (data) {
      menuWithOptions.forEach((e) =>
        e.value.map(v => v.value === data[e.key] ? v.showField: undefined)
          .filter(notUndefined).forEach(f => this.setFieldVisible(f.key, f.value)));
    }
  }

  isFieldVisible(key: string) {
    return this.fieldVisibility[key];
  }

  cancel() {
    this.onCancel.emit();
  }

  delete() {
    this.onDelete.emit();
  }

  reject() {
    this.onDelete.emit();
  }

  approve() {
    this.onApprove.emit();
  }

  submit() {
    this.onSubmit.emit(this.getFormValue());
  }

  refreshData() {
    this.onRefresh.emit();
  }

  cancelEdit() {
    this.invertIsEditing();
    this.refreshData();
  }

  downloadFile = (event: Any) => {
    if (event['filecontent']) {
      const data = event['filecontent'];
      const binary = atob(data.replace(/\s/g, ''));
      const len = binary.length;
      const buffer = new ArrayBuffer(len);
      const view = new Uint8Array(buffer);
      for (var i = 0; i < len; i++) {
          view[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([view], { type: event['filecontentContentType'] });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    }
  }

  fetchMissingValuesFromForm = () => {
    const result = {};
    for (const item of this.fetchList) {
      if (this.formGroup.get(item)) {
        result[item] = this.formGroup.get(item).value;
      }
    }
    return result;
  }

  getFormValue = () => {
    // TEMPORARY: just to make it work
    if (this.menuType === MenuType.Instance) {
      if (!this.loadedData['instanceAsDocId'] && this.loadedData['instanceAsDoc']) {
        this.loadedData['instanceAsDocId'] = this.loadedData['instanceAsDoc']['id'];
      }
      if (!this.loadedData['instanceAsDocName'] && this.loadedData['instanceAsDoc']) {
        this.loadedData['instanceAsDocName'] = this.loadedData['instanceAsDoc']['name'];
      }

      if (this.loadedData['instanceAsDocId']) {
        delete this.loadedData['instanceAsDoc'];
        Object.assign(this.loadedData, {instanceAsDoc: {id : this.loadedData['instanceAsDocId']}});
      }
    }

    const filtered = this.filterUnselected(this.formGroup.value, Object.entries(this.columnForMenu).filter((e: any) => e[1].options));
    return Object.assign(this.loadedData, filtered, this.fetchMissingValuesFromForm());
  }

  // filter unselected (empty) options from the form value
  filterUnselected = (formValue: object, menuWithOptions: object[]): {} => {
    const unfiltered = Object.assign({}, formValue);

    Object.keys(unfiltered).forEach(field => {
      if (menuWithOptions.filter(e => e[0] === field).length &&
      (!unfiltered[field] || unfiltered[field].length === 0)) {
        delete unfiltered[field];
      }
    });
    return unfiltered;
  }

  setIsAdmin = () => {
    if (this.menuType === MenuType.Instance) {
      const isOurServiceInstance =  this.isEditing ? AuthService.staticAuthInfo.orgMrn === this.formGroup.get('organizationId').value :
      AuthService.staticAuthInfo.orgMrn === this.loadedData['organizationId'];
      this.isAdmin = hasAdminPermission(this.menuType, this.authService, true, isOurServiceInstance);
    } else {
      this.isAdmin = hasAdminPermission(this.menuType, this.authService, true, false);
    }
  }

  isForTime = (fieldName: string) => {
    return fieldName.endsWith('At') || fieldName === 'end' || fieldName === 'start';
  }

  convertTimeString = (timeString: string) => {
    return convertTime(timeString);
  }

  invertIsEditing = () => {
    this.isEditing = !this.isEditing;
    if (!this.isEditing){
      this.formGroup.reset();
      this.adjustData(this.loadedData);
    }
  }

  settled = (value: boolean) => {
    this.isLoaded = value;
    this.isLoading = false;
  }

  updateForNewVer() {
    this.formGroup.get('instanceVersion').enable();
    this.isForNew = true;
  }

  adjustTitle = (menuType: string, title: string) => {
    this.menuType = menuType as MenuType;
    this.menuTypeName = MenuTypeNames[this.menuType];
    this.isEntity = EntityTypes.includes(this.menuType);
    this.title = title;
    this.isServiceInstance = this.menuType === MenuType.Instance || this.menuType === MenuType.InstanceOfOrg;
  }

  addShortIdToMrn = (field: string, shortId: string) => {
    const mrn = this.mrnHelperService.mrnMask( this.getShortIdType(field), this.orgShortId) + shortId;
    this.formGroup.get(field).setValue(mrn);
    if (field === 'orgMrn') {
      this.orgShortId = !this.orgShortId ? this.formGroup.get('orgMrn').value.split(":").pop():
        this.orgShortId;
      if (this.formGroup.get('adminMrn')) {
        const adminShortId = this.formGroup.get('adminMrn').value.split(":").pop();
        this.formGroup.get('adminMrn').setValue(this.mrnHelperService.mrnMaskForUserOfOrg(this.orgShortId) + adminShortId);
      }
    }
  }

  validateMrn = (mrn: string) => {
    if (!mrn || mrn.includes('::') || mrn.endsWith(':')) {
      return false;
    }
    else if (mrn.length === 0) {
      return false;
    }
    if (mrn.includes(':org:')) {
      return new RegExp(this.mrnHelperService.mrnMcpIdpRegexForOrg()).test(mrn);
    } else {
      return new RegExp(this.mrnHelperService.mrnMcpIdpRegex(
        this.orgShortId ? this.orgShortId :
        this.menuType === MenuType.NewOrganization ? this.getOrgShortId() : undefined)).test(mrn);
    }
  }

  getOrgShortId = (): string => {
    return this.formGroup.get('orgMrn') ? this.formGroup.get('orgMrn').value.split(':').pop() :
      this.orgMrn.split(':').pop();
  }

  getValidators = (key: string, value: any) => {
    const validators = [];
    if (value.required) {
      validators.push(Validators.required);
    }
    if (key.includes('email') || key.includes('Email')) {
      validators.push(Validators.email);
    }
    if (key !== 'mrnSubsidiary' && (key.includes('mrn') || key.includes('Mrn'))) {
      if (this.menuType === MenuType.Organization || this.menuType === MenuType.OrgCandidate) {
        validators.push(Validators.pattern(this.mrnHelperService.mrnMcpIdpRegexForOrg()));
      } else {
        validators.push(Validators.pattern(this.mrnHelperService.mrnMcpIdpRegex(this.orgShortId)));
      }
    }
    return validators;
  }

  isThisForMCPMRN(menyType: string, fieldName: string) {
    return menyType !== 'role' && fieldName === 'mrn';
  }

  adjustData = (rawData: object) => {
    const data = formatData(rawData);
    this.loadedData = data;
    Object.entries(this.columnForMenu).forEach(([key, menu]) => {
      if ((menu as any).immutable === true) {
        this.formGroup.get(key).disable();
      }
      if (this.isThisForMCPMRN(this.menuType, key)) {
        this.shortId = this.mrnHelperService.shortIdFromMrn(data[key]);
        const mrn = this.mrnHelperService.mrnMask(this.menuType, this.orgShortId) + this.shortId;
        this.formGroup.get(key).setValue(mrn);
      } else {
        if ((menu as any).type === 'string') {
          this.formGroup.get(key).setValue(data[key]);
        }
      }
    });

    const hasCertificate = data["certificates"] && data["certificates"].length > 0;
    if (hasCertificate) {
      const splited = this.certificateService.splitByRevokeStatus(data["certificates"]);
      this.activeCertificates = splited.activeCertificates;
      this.revokedCertificates = splited.revokedCertificates;
    }

    this.geometry = data["geometry"];

    this.setFormFieldVisibility(data);
    // check admin permission
    if (this.authService.authState.rolesLoaded) {
      this.setIsAdmin();
    } else {
      this.authService.rolesLoaded.subscribe((mode)=> {
        this.setIsAdmin();
      });
    }
    
  }

  setFormWithValidators = () => {
    const group = {};
    Object.entries(this.columnForMenu).forEach(([key, menu]) =>
    {
      if ((menu as any).type === 'string') {
        group[key] = [null, this.getValidators(key, menu)];
      }
    });
    this.formGroup = this.formBuilder.group(group);
  }

  onMenuItemSelected = (event: any) => {
    if (event.type === 'string') {
      this.formGroup.get(event.key).setValue(event.value);
      this.updateFieldVisibility(event.key, event.value);
    }
  }

  updateFieldVisibility = (key: string, value: string) => {
    const fieldInfo = this.columnForMenu[key].options?.filter(v => v.value === value);
    if (fieldInfo[0].showField) {
      this.setFieldVisible(fieldInfo[0].showField.key, fieldInfo[0].showField.value);
    }
  }

  setFieldVisible = (key: string, value: any) => {
    if (value) {
      this.fieldVisibility[key] = value;
      this.formGroup.get(key).enable();
    } else {
      this.loadedData[key] = undefined; // delete existing value
      this.fieldVisibility[key] = value;
      this.formGroup.get(key).disable();
    }
  }

  onListChanged = (event: any) => {
    if (event['data'] && event['fieldName']) {
      this.loadedData[event['fieldName']] = event['data'];
      this.loadedData = Object.assign(this.loadedData, {[event['fieldName']]: event['data']});
    }
  }

  openXmlDialog = (xml: any, isEditing: boolean = false) => {
    this.dialogService.open(XmlEditDialogComponent, {
      context: {
        xml: xml,
        isEditing: isEditing,
        onUpdate: (xml: XmlDto) => this.loadedData['xml'] = xml,
      },
    });
  }

  sortColumnForMenu = (a, b) => {
    return a.order > b.order ? -1 : 1;
  }
}
