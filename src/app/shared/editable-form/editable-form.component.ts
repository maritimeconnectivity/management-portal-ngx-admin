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
    const data = this.convertStringToArray(this.formGroup.value);
    return Object.assign({}, data, this.fetchMissingValuesFromForm());
  }

  isOurServiceInstance = () => {
    return this.orgMrn === this.loadedData['organizationId'];
  }

  convertStringToArray = (data: any) => {
    const relevantSections = Object.entries(data).filter( e => Object.entries(this.columnForMenu).filter( ee => ee[1][0] === e[0] && ee[1][1]['convertToBeArray']).length );
    relevantSections.forEach( section => {
      data[section[0]] = section[1] && typeof(section[1]) === 'string' ? (section[1] as string).split(',') : [];
    });
    return data;
  }

  invertIsEditing = () => {
    this.isEditing = !this.isEditing;
    if (!this.isEditing){
      this.formGroup.reset(this.loadedData);
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

  adjustData = (rawData: object) => {
    const data = formatData(rawData);
    this.loadedData = data;
    for(const key in data) {
      const relevant = this.columnForMenu.filter(e => e[0] === key)[0];
      if (relevant) {
        if (relevant[1].immutable === true) {
          this.formGroup.get(relevant[0]).disable();
        }
        if (this.menuType !== 'role' && relevant[0] === 'mrn') {
          this.shortId = this.mrnHelperService.shortIdFromMrn(data[key]);
          const mrn = this.mrnHelperService.mrnMask(this.menuType, this.orgShortId) + this.shortId;
          //this.isShortIdValid = this.validateMrn(mrn);
          this.formGroup.get(relevant[0]).setValue(mrn);
        } else {
          this.formGroup.get(relevant[0]).setValue(data[key]);
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
    for (const key in this.columnForMenu) {
      group[this.columnForMenu[key][0]] = [null, this.getValidators(this.columnForMenu[key])];
    }
    this.formGroup = this.formBuilder.group(group);
  }

  onMenuItemSelected = (event: any, field: any) => {
    this.formGroup.get(field).setValue(event);
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
