import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatData } from '../../util/dataFormatter';
import { MrnHelperService } from '../../util/mrn-helper.service';
import { ColumnForMenu } from '../models/columnForMenu';
import { EntityTypes, MenuType, MenuTypeNames } from '../models/menuType';
import { NbIconLibraries } from '@nebular/theme';
import { CertificateService } from '../certificate.service';

@Component({
  selector: 'ngx-editable-form',
  templateUrl: './editable-form.component.html',
  styleUrls: ['./editable-form.component.scss']
})
export class EditableFormComponent implements OnInit {

  @Input() menuType: string;
  @Input() instanceVersion: string;
  @Input() isForNew: boolean;
  @Input() isShortIdValid: boolean;
  @Input() isUnapprovedorg: boolean;
  @Input() canApproveOrg: boolean;
  @Input() entityMrn: string;
  @Input() orgMrn: string;
  @Input() isAdmin: boolean;
  @Input() title: string;
  @Input() iconName: string;
  @Input() isLoading: boolean;
  @Input() isLoaded: boolean;

  @Output() onCancel = new EventEmitter<FormGroup>();
  @Output() onDelete = new EventEmitter<FormGroup>();
  @Output() onSubmit = new EventEmitter<FormGroup>();

  data = {};
  isEditing = false;
  isEntity = false;
  columnForMenu: any;
  values = {};
  formGroup: FormGroup;
  shortId = '';
  roleId = -1;
  contextForAttributes = 'detail';
  menuTypeName = '';
  activeCertificates = [];
  revokedCertificates = [];
  
  constructor(
    private mrnHelperService: MrnHelperService,
    private formBuilder: FormBuilder,
    private iconsLibrary: NbIconLibraries,
    private certificateService: CertificateService,
  ) {
    iconsLibrary.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });
  }

  ngOnInit(): void {
    // filtered with context
    this.columnForMenu = Object.entries(ColumnForMenu[this.menuType]).filter(([k,v]) => 
      Array.isArray(v['visibleFrom']) &&
      v['visibleFrom'].includes(this.contextForAttributes) &&
      (!this.isEditing || (this.isForNew && v['notShowOnEdit'] !== true)));

    this.setFormWithValidators();

    if (this.isForNew) {
      this.isEditing = true;
      if (this.formGroup.get('mrn')){
        this.formGroup.get('mrn').setValue(this.mrnHelperService.mrnMask(this.menuType));
        this.formGroup.get('mrn').disable();
      }
      this.settled(true);
    }
  }

  cancel(){
    this.onCancel.emit();
  }

  delete(){
    this.onDelete.emit();
  }

  submit() {
    this.onSubmit.emit(this.formGroup);
  }

  invertIsEditing() {
    this.isEditing = !this.isEditing;
  }

  settled(value: boolean) {
    this.isLoaded = value;
    this.isLoading = false;
  }

  updateForNewVer() {
    this.formGroup.get('instanceVersion').enable();
    this.isForNew = true;
  }

  addShortIdToMrn(shortId: string) {
    const mrn = this.mrnHelperService.mrnMask(this.menuType) + shortId;
    this.formGroup.get('mrn').setValue(mrn);
    this.isShortIdValid = this.validateMrn(mrn);
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
      if (this.menuType === MenuType.Organization || this.menuType === MenuType.UnapprovedOrg) {
        validators.push(Validators.pattern(this.mrnHelperService.mrnMcpIdpRegexForOrg()));
      } else {
        validators.push(Validators.pattern(this.mrnHelperService.mrnMcpIdpRegex()));
      }
    }
    return validators;
  }

  validateMrn(mrn: string) {
    if (this.menuType === MenuType.Organization || this.menuType === MenuType.UnapprovedOrg) {
      return new RegExp(this.mrnHelperService.mrnMcpIdpRegexForOrg()).test(mrn);
    } else {
      return new RegExp(this.mrnHelperService.mrnMcpIdpRegex()).test(mrn);
    }
  }

  adjustTitle = (menuType: string, title: string) => {
    this.menuType = menuType;
    this.menuTypeName = MenuTypeNames[this.menuType];
    this.isEntity = EntityTypes.includes(this.menuType);
    this.title = title;
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
    const hasCertificate = data["certificates"] && data["certificates"].length > 0;
    if (hasCertificate) {
      const splited = this.certificateService.splitByRevokeStatus(data["certificates"]);
      this.activeCertificates = splited.activeCertificates;
      this.revokedCertificates = splited.revokedCertificates;
    }
  }

  setFormWithValidators = () => {
    const group = {};
    for (const key in this.columnForMenu) {
      group[this.columnForMenu[key][0]] = [null, this.getValidators(this.columnForMenu[key])];
    }
    this.formGroup = this.formBuilder.group(group);
  }

}
