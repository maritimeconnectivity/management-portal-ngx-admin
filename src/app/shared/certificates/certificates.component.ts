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

import {Certificate} from '../../backend-api/identity-registry';
import {CertRevokeDialogComponent} from './cert-revoke-dialog/cert-revoke-dialog.component';
import {CertIssueDialogComponent} from './cert-issue-dialog/cert-issue-dialog.component';
import {ActiveCertificatesColumn, RevokedCertificatesColumn} from '../models/columnForCertificate';
import {Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {Certificate as MCPCertificate} from '../../backend-api/identity-registry';
import {FileHelperService} from '../file-helper.service';
import {NotifierService} from 'angular-notifier';
import {NbDialogService} from '@nebular/theme';
import {CertificateService} from '../certificate.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'ngx-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
})

export class CertificatesComponent implements OnInit {

  settings = {
    mode: 'external',
    edit: {
      editButtonContent: '<small><i class="fas fa-file-download fa-xs"></i></small>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<small><i class="fas fa-ban fa-xs"></i></small>',
      confirmDelete: true,
    },
    hideSubHeader: true,
    actions: {
      position: 'right',
    },
  };

  source: LocalDataSource = new LocalDataSource();

  @Input() data: any[];
  @Input() forRevoked: boolean;
  @Input() entityMrn: string;
  @Input() entityTitle: string;
  @Input() entityType: string;
  @Input() orgMrn: string;
  @Input() instanceVersion: string;
  @Input() hasPermissionInMIR: boolean;
  @Output() onUpdate: EventEmitter<any> = new EventEmitter();

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private notifierService: NotifierService, private fileHelper: FileHelperService,
    private certificateService: CertificateService, private dialogService: NbDialogService) {
  }

  ngOnInit(): void {
    if (this.forRevoked) {
      this.settings['actions'] = undefined;
      this.settings['columns'] = RevokedCertificatesColumn;
    } else {
      this.settings['columns'] = ActiveCertificatesColumn;
    }
  }

  openIssueDialog() {
    if (this.hasPermissionInMIR) {
      this.dialogService.open(CertIssueDialogComponent, {
        context: {
          entityMrn: this.entityMrn,
          entityTitle: this.entityTitle,
          entityType: this.entityType,
          orgMrn: this.orgMrn,
          instanceVersion: this.instanceVersion,
          notifierService: this.notifierService,
          fileHelper: this.fileHelper,
          certificateService: this.certificateService,
          updateCertificate: () => this.onUpdate.emit(),
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      });
    } else {
      this.notifierService.notify('error', 'You don\'t have right permission');
    }
  }

  openRevokeDialog(data: Certificate) {
    if (this.hasPermissionInMIR) {
      this.dialogService.open(CertRevokeDialogComponent, {
        context: {
          entityMrn: this.entityMrn,
          entityTitle: this.entityTitle,
          entityType: this.entityType,
          orgMrn: this.orgMrn,
          certificateId: data.serialNumber,
          instanceVersion: this.instanceVersion,
          notifierService: this.notifierService,
          certificateService: this.certificateService,
          updateCertificate: () => this.onUpdate.emit(),
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      });
    } else {
      this.notifierService.notify('error', 'You don\'t have right permission');
    }
  }

  onEdit(event): void {
    this.download(event.data);
    this.notifierService.notify('success', 'Chosen certificate has downloaded');
  }

  onDelete(event): void {
    this.openRevokeDialog(event.data);
  }

  download(certificate: MCPCertificate) {
    const endText = formatDate(certificate.end, 'yyyy-MM-ddTHH-mm-ss', this.locale);
    this.fileHelper.downloadPemCertificate({certificate: certificate.certificate},
      this.entityTitle + '_exp_' + endText, this.notifierService);
  }
}
