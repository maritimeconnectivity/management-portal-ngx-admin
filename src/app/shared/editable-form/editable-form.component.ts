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

import { InputGeometryComponent } from '../input-geometry/input-geometry.component';
import { convertTime } from './../../util/timeConverter';
import { XmlEditDialogComponent } from '../xml-edit-dialog/xml-edit-dialog.component';
import { AuthService } from './../../auth/auth.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatData } from '../../util/dataFormatter';
import { MrnHelperService } from '../../util/mrn-helper.service';
import { ColumnForResource } from '../models/columnForMenu';
import { EntityTypes, ResourceType, MenuTypeNames, MrnAttributeInMSR } from '../models/menuType';
import { NbDialogService, NbIconLibraries } from '@nebular/theme';
import { CertificateService } from '../certificate.service';
import { XmlDto } from '../../backend-api/service-registry';
import { hasAdminPermission } from '../../util/adminPermissionResolver';

/**
 * a simple function filtering undefined
 * @param anyValue value to be validated
 * @returns boolean of whether undefined or not
 */
const notUndefined = (anyValue: any) => typeof anyValue !== 'undefined';

/**
 * a component providing an input form according to ColumnFor*.json
 */
@Component({
  selector: 'ngx-editable-form',
  templateUrl: './editable-form.component.html',
  styleUrls: ['./editable-form.component.scss']
})
export class EditableFormComponent implements OnInit {

  /**
   * menu type of an active page
   */
  @Input() menuType: ResourceType;
  /**
   * service instance version (only for service instance)
   */
  @Input() instanceVersion: string;
  /**
   * a boolean indicating its use for creating entity
   */
  @Input() isForNew: boolean;
  /**
   * a boolean indicating the use for registration
   */
   @Input() isForRegistration: boolean;
  /**
   * an mrn of chosen entity for this form
   */
  @Input() entityMrn: string;
  /**
   * an mrn of organization owning the chosen entity
   */
  @Input() orgMrn: string;
  /**
   * a human readable name of the chosen entity
   */
  @Input() title: string;
  /**
   * an icon name for the entity
   */
  @Input() iconName: string;
  /**
   * an indicator of API call status
   */
  @Input() isLoading: boolean;
  /**
   * an indicator of API call settlement
   */
  @Input() isLoaded: boolean;
  /**
   * an indicator of showing buttons at header
   */
  @Input() showButtons: boolean;
  /**
   * an indicator of having header
   */
  @Input() hasHeader: boolean;
  /**
   * an ID number converted from string for the cases when it is needed, like roles
   */
  @Input() numberId: number;
  /**
   * a short ID of organization for the sake of MRN
   */
  @Input() orgShortId: string;
  /**
   * a permission string for the form
   */
  @Input() defaultPermissions: string;

  /**
   * a cancel event callback
   */
  @Output() onCancel = new EventEmitter<any>();
  /**
   * a deletion event callback
   */
  @Output() onDelete = new EventEmitter<any>();
  /**
   * a submission event callback
   */
  @Output() onSubmit = new EventEmitter<any>();
  /**
   * an approval event callback
   */
  @Output() onApprove = new EventEmitter<any>();
  /**
   * an rejection event callback
   */
  @Output() onReject = new EventEmitter<any>();
  /**
   * a refresh event callback
   */
  @Output() onRefresh = new EventEmitter<any>();

  /**
   * a link to geometry map component, mainly for consistency
   */
  @ViewChild('map') geometryMap: InputGeometryComponent;

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
  geometries = [];
  canApproveOrg = false;

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

  /**
   * a function returning whether the resource type requires short ID or not
   * @param resourceType type of resource
   * @returns whether the resource type requires short ID or not
   */
  needShortId = (resourceType: string) => {
    return this.getShortIdType(resourceType) !== undefined;
  }

  /**
   * a function returning whether the resource type requires short ID or not
   * @param resourceType type of resource
   * @returns whether the resource type requires short ID or not
   */
   hasDefaultValueForMrn = (resourceType: string) => {
    return resourceType === MrnAttributeInMSR.Instance || resourceType === MrnAttributeInMSR.Design;
  }

  /**
   * a function fetching its short ID
   * @param resourceType type of resource
   * @returns whether the resource type requires short ID or not
   */
  getShortIdType = (resourceType: string) => {
    return this.columnForMenu[resourceType] ? this.columnForMenu[resourceType].shortIdType : undefined;
  }

  /**
   * a function initializing the interface depending on its context
   */
  ngOnInit(): void {
    this.setForm();

    if (this.isForNew) {
      this.isEditing = true;
      this.setFormFieldVisibility();
      Object.keys(this.formGroup.controls).forEach(field => {
        if (this.hasDefaultValueForMrn(field)) {
          this.formGroup.get(field).setValue(
            this.mrnHelperService.defaultMrn());
        }
        if (this.needShortId(field)) {
          this.formGroup.get(field).setValue(
            this.mrnHelperService.mrnMask( this.getShortIdType(field), this.orgShortId) );
          this.formGroup.get(field).disable();
        }
      });
      if (this.defaultPermissions) {
        this.formGroup.get('permissions').setValue(this.defaultPermissions);
      }
      if (this.menuType === ResourceType.Instance) {
        this.formGroup.get('organizationId').setValue(AuthService.staticAuthInfo.orgMrn);
        this.formGroup.get('organizationId').disable();
        Object.entries(ColumnForResource[this.menuType]).map(([key, value]) => 
        {
          if ((value as any).type === 'stringArray') {
            this.loadedData[key] = [];
          }
        });
      }

      // assign admin permission
      // when the page is for registration then enable the submit button
      if (this.isForRegistration) {
        this.isAdmin = true;
      } else {
      // otherwise we need to check the assigned role
        if (this.authService.authState.rolesLoaded) {
          this.setIsAdmin();
        } else {
          this.authService.rolesLoaded.subscribe((mode)=> {
            this.setIsAdmin();
          });
        }
      }
      this.settled(true);
    }
  }

  /**
   * creating a form taking given menu type account into
   */
  setForm = () => {
    // filtered with context
    this.columnForMenu = {};
    Object.entries(ColumnForResource[this.menuType]).map(([k,v]) => 
      {if (Array.isArray(v['visibleFrom']) && // array type checking
      v['visibleFrom'].includes(this.contextForAttributes) && // context filtering, either detail or list
      (!this.isEditing || (this.isForNew && v['notShowOnEdit'] !== true)))
        this.columnForMenu[k] = v;}
      );

    this.setFormWithValidators();
  }

  /**
   * adjusting the form to given data
   * @param data data from backend
   */
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
      let hasChosen = false;
      const keys = new Set();
      menuWithOptions.forEach((e) =>
        e.value.map(v => v.value === data[e.key] ? v.showField: undefined)
          .filter(notUndefined).forEach(f => {
            this.setFieldVisible(f.key, f.value);
            keys.add(f.key);
            hasChosen = true;
          }));
      // if none of options has chosen, the formGroup validation needs to be updated according to
      if (!hasChosen) {
        menuWithOptions.forEach((e) =>
          e.value.forEach( k => {
              if (k.showField && k.showField.key && !this.columnForMenu[e.key].required) {
                this.formGroup.get(k.showField.key).disable();
              }
            }));
      }
    }
  }

  /**
   * getting field's visibility
   * @param key field name
   * @returns a boolean indicating whether the field should be visible or not
   */
  isFieldVisible(key: string) {
    return this.fieldVisibility[key];
  }

  /**
   * executing the onCancel callback function
   */
  cancel() {
    this.onCancel.emit();
  }

  /**
   * executing the onDelete callback function
   */
  delete() {
    this.onDelete.emit();
  }

  /**
   * executing the onReject callback function
   */
  reject() {
    this.onReject.emit();
  }

  /**
   * executing the onApprove callback function
   */
  approve() {
    this.onApprove.emit();
  }

  /**
   * executing the onSubmit callback function
   */
  submit() {
    this.onSubmit.emit(this.getFormValue());
  }

  /**
   * executing the onCancel callback function
   */
  refreshData() {
    this.onRefresh.emit();
  }

  /**
   * handling edit cancel event
   */
  cancelEdit() {
    this.invertIsEditing();
    this.refreshData();
  }

  /**
   * fetching missed fields which can't get from a native formGroup
   * @param fetchList list of fields needed to be fetched
   * @returns fetched values
   */
  fetchMissingValuesFromForm = (fetchList: any[]) => {
    const result = {};
    for (const item of fetchList) {
      if (this.formGroup.get(item)) {
        result[item] = this.formGroup.get(item).value;
      }
    }
    return result;
  }

  /**
   * getting a full and solid values from the editable form
   * @returns fully integrated form value
   */
  getFormValue = () => {
    // TEMPORARY: just to make it work
    if (this.menuType === ResourceType.Instance) {
      if (this.loadedData['instanceAsDoc']) {
        this.loadedData['instanceAsDocId'] = this.loadedData['instanceAsDoc']['id'];
        this.loadedData['instanceAsDocName'] = this.loadedData['instanceAsDoc']['name'];
      }

      if (this.loadedData['instanceAsDocId']) {
        delete this.loadedData['instanceAsDoc'];
        Object.assign(this.loadedData, {instanceAsDoc: {id : this.loadedData['instanceAsDocId']}});
      }
    }

    const filtered =
      this.filterUnselected(this.formGroup.value, Object.entries(this.columnForMenu).filter((e: any) => e[1].options));
    return Object.assign(this.loadedData, filtered, this.fetchMissingValuesFromForm(this.fetchList));
  }

  /**
   * filtering unselected (empty) options from the form value
   * @param formValue form to be filtered
   * @param menuWithOptions menu option reference
   * @returns form values without undefined
   */
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

  /**
   * setting admin permission from auth information
   */
  setIsAdmin = () => {
    if (this.menuType === ResourceType.Instance) {
      const isOurServiceInstance =  this.isEditing ? AuthService.staticAuthInfo.orgMrn === this.formGroup.get('organizationId').value :
      AuthService.staticAuthInfo.orgMrn === this.loadedData['organizationId'];
      this.isAdmin = hasAdminPermission(this.menuType, this.authService, true, isOurServiceInstance);
    } else {
      this.isAdmin = hasAdminPermission(this.menuType, this.authService, true, false);
      if (this.menuType === ResourceType.OrgCandidate) {
        this.canApproveOrg = true;
      }
    }
  }

  /**
   * checking the field is for time-specific
   * @param fieldName name of field
   * @returns whether the field is for time or not
   */
  isForTime = (fieldName: string) => {
    return fieldName.endsWith('At') || fieldName === 'end' || fieldName === 'start';
  }

  /**
   * providing a proper way to show time
   * @param timeString given string
   * @returns a formatted string of time
   */
  convertTimeString = (timeString: string) => {
    return convertTime(timeString);
  }

  /**
   * inverting editing status of page
   */
  invertIsEditing = () => {
    this.isEditing = !this.isEditing;
    if (!this.isEditing){
      this.formGroup.reset();
      this.adjustData(this.loadedData);
    }
    if (this.geometryMap && this.geometryMap.applyEditingToMap) {
      this.geometryMap.applyEditingToMap(this.isEditing);
    }
  }

  /**
   * setting the page with the settlement state
   * @param isLoaded stating the loading result
   */
  settled = (isLoaded: boolean) => {
    this.isLoaded = isLoaded;
    this.isLoading = false;
  }

  /**
   * activating a field for instance version
   */
  updateForNewVer() {
    this.formGroup.get('instanceVersion').enable();
    this.isForNew = true;
  }

  adjustTitle = (menuType: string, title: string) => {
    this.menuType = menuType as ResourceType;
    this.menuTypeName = MenuTypeNames[this.menuType];
    this.isEntity = EntityTypes.includes(this.menuType);
    this.title = title;
    this.isServiceInstance = this.menuType === ResourceType.Instance || this.menuType === ResourceType.InstanceOfOrg;
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
        this.menuType === ResourceType.NewOrganization ? this.getOrgShortId() : undefined)).test(mrn);
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
      if (this.menuType === ResourceType.Organization || this.menuType === ResourceType.OrgCandidate) {
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

    this.geometries = [data["geometry"]];
    if (this.geometryMap) {
      this.geometryMap.loadGeometryOnMap();
    }

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

  onDataChanged = (event: any) => {
    if (event['data'] && event['fieldName']) {
      this.loadedData = Object.assign(this.loadedData, {[event['fieldName']]: event['data']});
    }
  }

  onLinkChanged = (event: any) => {
    if (event.fieldName && event.value) {
      this.loadedData[event.fieldName] = event.value;
    }
  }

  onUpdateGeometry = (event: any) => {
    if (event['data'] && event['fieldName']) {
      this.loadedData = { ...this.loadedData, ...{[event['fieldName']]: event['data']}};
    }
  }

  openXmlDialog = (xml: any, isEditing: boolean = false) => {
    this.dialogService.open(XmlEditDialogComponent, {
      context: {
        xml: xml,
        isEditing: isEditing,
        onUpdate: (xml: XmlDto) => this.updateXml(xml),
      },
    });
  }

  updateXml = (xml: XmlDto) => {
    this.loadedData['instanceAsXml'] = xml;
  }

  onFileDeleted = (event: any) => {
    if (event.fieldName === 'instanceAsDoc') {
      this.loadedData['instanceAsDoc'] = undefined;
    }
  }

  sortColumnForMenu = (a, b) => {
    return a.order > b.order ? -1 : 1;
  }
}
