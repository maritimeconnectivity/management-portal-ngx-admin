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
import { XmlDto } from '../../backend-api/service-registry';
import { Any } from 'asn1js';

@Component({
  selector: 'ngx-editable-form',
  templateUrl: './editable-form.component.html',
  styleUrls: ['./editable-form.component.scss']
})
export class EditableFormComponent implements OnInit {

  @Input() menuType: string;
  @Input() instanceVersion: string;
  @Input() isForNew: boolean;
  @Input() canApproveOrg: boolean;
  @Input() entityMrn: string;
  @Input() orgMrn: string;
  @Input() isAdmin: boolean;
  @Input() title: string;
  @Input() iconName: string;
  @Input() isLoading: boolean;
  @Input() isLoaded: boolean;
  @Input() showButtons: boolean;
  @Input() hasHeader: boolean;
  @Input() orgShortId: string;
  @Input() defaultPermissions: string;

  @Output() onCancel = new EventEmitter<FormGroup>();
  @Output() onDelete = new EventEmitter<FormGroup>();
  @Output() onSubmit = new EventEmitter<FormGroup>();
  @Output() onApprove = new EventEmitter<FormGroup>();
  @Output() onRefresh = new EventEmitter<FormGroup>();

  loadedData = {};
  nonStringForm = {};
  fetchList = ['mrn', 'version', 'orgMrn', 'adminMrn', 'instanceId', 'organizationId', 'implementsServiceDesign', 'email', 'orgEmail', 'adminEmail', 'instanceVersion'];
  isEditing = false;
  isEntity = false;
  columnForMenu: any;
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
    private dialogService: NbDialogService
  ) {
    iconsLibrary.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });
  }

  needShortId = (field: string) => {
    return this.getShortIdType(field) !== undefined;
  }

  getShortIdType = (field: string) => {
    return this.columnForMenu.filter(e => e[0] === field).pop()[1].shortIdType;
  }

  ngOnInit(): void {
    // filtered with context
    this.columnForMenu = Object.entries(ColumnForMenu[this.menuType]).filter(([k,v]) => 
      Array.isArray(v['visibleFrom']) && // array type checking
      v['visibleFrom'].includes(this.contextForAttributes) && // context filtering, either detail or list
      (!this.isEditing || (this.isForNew && v['notShowOnEdit'] !== true))); 
      
    this.setFormWithValidators();

    if (this.isForNew) {
      this.isEditing = true;
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
      }
      this.settled(true);
    }
  }

  cancel() {
    this.onCancel.emit();
  }

  delete() {
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

    return Object.assign(this.loadedData, this.formGroup.value, this.fetchMissingValuesFromForm());
  }

  isOurServiceInstance = () => {
    return this.orgMrn === this.loadedData['organizationId'];
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
    this.menuType = menuType;
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

  getValidators = (field: any) => {
    const validators = [];
    if (field[1].required) {
      validators.push(Validators.required);
    }
    if (field[0].includes('email') || field[0].includes('Email')) {
      validators.push(Validators.email);
    }
    if (field[0] !== 'mrnSubsidiary' && (field[0].includes('mrn') || field[0].includes('Mrn'))) {
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
    for(const key in data) {
      const relevant = this.columnForMenu.filter(e => e[0] === key)[0];
      if (relevant) {
        if (relevant[1].immutable === true) {
          this.formGroup.get(relevant[0]).disable();
        }
        if (this.isThisForMCPMRN(this.menuType, relevant[0])) {
          this.shortId = this.mrnHelperService.shortIdFromMrn(data[key]);
          const mrn = this.mrnHelperService.mrnMask(this.menuType, this.orgShortId) + this.shortId;
          this.formGroup.get(relevant[0]).setValue(mrn);
        } else {
          if (relevant[1].type === 'string') {
            this.formGroup.get(relevant[0]).setValue(data[key]);
          }
        }
      }
    }
    const hasCertificate = data["certificates"] && data["certificates"].length > 0;
    if (hasCertificate) {
      const splited = this.certificateService.splitByRevokeStatus(data["certificates"]);
      this.activeCertificates = splited.activeCertificates;
      this.revokedCertificates = splited.revokedCertificates;
    }

    this.geometry = data["geometry"];
  }

  setFormWithValidators = () => {
    const group = {};
    for (const menu of this.columnForMenu) {
      if (menu[1].type === 'string') {
        group[menu[0]] = [null, this.getValidators(menu)];
      }
    }
    this.formGroup = this.formBuilder.group(group);
  }

  onMenuItemSelected = (event: any, field: any, type: string) => {
    if (type === 'string') {
      this.formGroup.get(field).setValue(event);
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
}
