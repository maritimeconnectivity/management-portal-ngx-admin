/*
 * Copyright (c) 2022 Maritime Connectivity Platform Consortium
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
import { MenuType } from './../models/menuType';
import { VesselImageControllerService } from './../../backend-api/identity-registry/api/vesselImageController.service';
import { LogoControllerService } from './../../backend-api/identity-registry/api/logoController.service';
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

  @Input() menuType: MenuType;
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
    ) { }

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
    let message = 'Are you sure you want to delete?';
    if (confirm(message)) {
      this.isLoading = true;
      this.deleteImage(this.menuType, this.entityMrn, this.orgMrn).subscribe(
        res => {
          this.notifierService.notify('success', 'Uploaded image has been successfully deleted');
          this.isLoading = false;
          this.image = undefined;
        },
        err => {
          this.notifierService.notify('error', 'There was error in deletion - ' + err.error.message);
          this.isLoading = false;
        },
      );
    }
  }

  changeFile = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    this.isLoading = true;
    reader.addEventListener('load', (event:Event) => {
	    this.image = (<any> event.target).result;
      const mediaType = file.type;
      if ((mediaType !== "image/png") && (mediaType !== "image/jpeg")) {
        return;
      }
      this.updatePut(this.menuType, file, this.entityMrn, this.orgMrn, mediaType).subscribe(
        logo => {
          this.isLoading = false;
        },
        err => this.notifierService.notify('error', 'There was error in updating image - ' + err.error.message),
      );
    }, false);
    reader.readAsDataURL(file);
  }

  updatePut(menuType: MenuType, file: any, entityMrn: string, orgMrn: string, mediaType: string): Observable<any> {
    return menuType === MenuType.Organization ?
        this.logoControllerService.updateLogoPut(file, entityMrn, mediaType) :
      menuType === MenuType.Vessel ?
        this.vesselImageControllerService.updateVesselImagePut(file, orgMrn, entityMrn, mediaType) :
        new Observable<any>();
  }

  getImage(menuType: MenuType, entityMrn: string, orgMrn: string): Observable<any> {
    return menuType === MenuType.Organization ?
        this.logoControllerService.getLogo(entityMrn) :
      menuType === MenuType.Vessel ?
        this.vesselImageControllerService.getVesselImage(orgMrn, entityMrn) :
        new Observable<any>();
  }

  deleteImage(menuType: MenuType, entityMrn: string, orgMrn: string): Observable<any> {
    return menuType === MenuType.Organization ?
        this.logoControllerService.deleteLogo(entityMrn) :
      menuType === MenuType.Vessel ?
        this.vesselImageControllerService.deleteVesselImage(orgMrn, entityMrn) :
        new Observable<any>();
  }
}
