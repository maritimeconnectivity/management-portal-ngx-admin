import { addLangs, loadLang } from './../../util/translateHelper';
import { TranslateService } from '@ngx-translate/core';
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

import { Observable } from 'rxjs';
import { ResourceType } from '../models/menuType';
import { VesselImageControllerService } from '../../backend-api/identity-registry/api/vesselImageController.service';
import { LogoControllerService } from '../../backend-api/identity-registry/api/logoController.service';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotifierService } from 'angular-notifier';

type FileRestrictions = any;
type FileInfo = any;

@Component({
  selector: 'ngx-input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.scss']
})
export class InputImageComponent implements OnInit {

  @Input() menuType: ResourceType;
  @Input() isEditing: boolean;
  @Input() orgMrn: string;
  @Input() entityMrn: string;
  @Input() allowedExtensions: string[];
  accept = '';
  image: any;
  isLoading = false;

  constructor(
    private logoControllerService: LogoControllerService,
    private vesselImageControllerService: VesselImageControllerService,
    private notifierService: NotifierService,
    private sanitizer: DomSanitizer,
    public translate: TranslateService,
    ) {
      addLangs(translate);
      loadLang(translate);
    }

  ngOnInit(): void {
    this.accept = this.allowedExtensions ? this.allowedExtensions.join(',') : '';
    if (this.entityMrn) {
      this.getImage(this.menuType, this.entityMrn, this.orgMrn).subscribe(
        blob => {
          const objectURL = URL.createObjectURL(new Blob([blob]));
          this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        },
        err => { console.log(err); },
      );
    }
  }

  clickToRemoveImage = () => {
    const message = this.translate.instant('warning.resource.beforeDeletion');
    if (confirm(message)) {
      this.isLoading = true;
      this.deleteImage(this.menuType, this.entityMrn, this.orgMrn).subscribe(
        res => {
          this.notifierService.notify('success',
            this.translate.instant('success.resource.uploadImage'));
          this.isLoading = false;
          this.image = undefined;
        },
        err => {
          this.notifierService.notify('error',
            this.translate.instant('error.resource.errorInDeletion') + err.error.message);
          this.isLoading = false;
        },
      );
    }
  }

  changeFile = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    this.isLoading = true;
    reader.addEventListener('load', (e: Event) => {
      this.image = (<any> e.target).result;
      const mediaType = file.type;
      if ((mediaType !== 'image/png') && (mediaType !== 'image/jpeg')) {
        return;
      }
      this.updatePut(this.menuType, file, this.entityMrn, this.orgMrn, mediaType).subscribe(
        logo => {
          this.isLoading = false;
        },
        err => this.notifierService.notify('error',
          this.translate.instant('error.resource.updateImageFailed') + err.error.message),
      );
    }, false);
    reader.readAsDataURL(file);
  }

  updatePut(menuType: ResourceType, file: any, entityMrn: string, orgMrn: string, mediaType: string): Observable<any> {
    return menuType === ResourceType.Organization ?
        this.logoControllerService.updateLogoPut(file, entityMrn) :
      menuType === ResourceType.Vessel ?
        this.vesselImageControllerService.updateVesselImagePut(file, orgMrn, entityMrn) :
        new Observable<any>();
  }

  getImage(menuType: ResourceType, entityMrn: string, orgMrn: string): Observable<any> {
    return menuType === ResourceType.Organization ?
        this.logoControllerService.getLogo(entityMrn) :
      menuType === ResourceType.Vessel ?
        this.vesselImageControllerService.getVesselImage(orgMrn, entityMrn) :
        new Observable<any>();
  }

  deleteImage(menuType: ResourceType, entityMrn: string, orgMrn: string): Observable<any> {
    return menuType === ResourceType.Organization ?
        this.logoControllerService.deleteLogo(entityMrn) :
      menuType === ResourceType.Vessel ?
        this.vesselImageControllerService.deleteVesselImage(orgMrn, entityMrn) :
        new Observable<any>();
  }
}
