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

import { NotifierService } from 'angular-notifier';
import { CertificateService } from '../../certificate.service';
import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { getReasonOptionFromRevocationReason } from '../../../util/certRevokeInfo';
import { EntityType } from '../../models/menuType';
import { DayCellComponent } from '../../calendar/day-cell/day-cell.component';
import { CertificateRevocation } from '../../../backend-api/identity-registry';

@Component({
  selector: 'ngx-cert-revoke-dialog',
  templateUrl: './cert-revoke-dialog.component.html',
  styleUrls: ['./cert-revoke-dialog.component.scss'],
})
export class CertRevokeDialogComponent implements OnInit {

  @Input() entityMrn: string;
  @Input() entityTitle: string;
  @Input() orgMrn: string;
  @Input() certificateId: number;
  @Input() instanceVersion: string;
  @Input() entityType: string;
  @Input() certificateService: CertificateService;
  @Input() notifierService: NotifierService;
  @Input() updateCertificate: () => void;
  
  isLoading: boolean;
  date = new Date();
  reasons = [];
  description = '';
  reference = '';
  revokationReason: CertificateRevocation.RevokationReasonEnum;
  dayCellComponent = DayCellComponent;
  
  constructor(protected ref: NbDialogRef<CertRevokeDialogComponent>) {
    this.isLoading = false;
    for (const reason in CertificateRevocation.RevokationReasonEnum) {
      this.reasons.push(getReasonOptionFromRevocationReason(reason.toLocaleLowerCase() as CertificateRevocation.RevokationReasonEnum));
    }
  }

  doRevoke() {
    this.isLoading = true;
    const certificateRevocation: CertificateRevocation = {
      revokedAt: this.date,
      revokationReason: this.revokationReason,
    };

    this.certificateService.revokeCertificate(this.entityType as EntityType, this.entityMrn, this.orgMrn, this.certificateId, certificateRevocation, this.instanceVersion)
        .subscribe((res: any) => {
          this.ref.close();
          this.notifierService.notify('success',
              'Certificate has been successfully revoked');
          this.isLoading = false;
          this.updateCertificate();
        }, err => {
          this.isLoading = false;
          if (err.status === 410) {
            this.notifierService.notify('error',
                'Generating certificates with server generated keys is not supported by ' +
                'this ID provider');
            return;
          }
          this.notifierService.notify('error',
              'Error when trying to issue new certificate', err.error.message);
        });
  }
  ngOnInit(): void {
  }

  dismiss() {
    this.ref.close();
    this.updateCertificate();
  }

  onMenuItemSelected(event) {
    const chosenReasonOption = getReasonOptionFromRevocationReason(event);
    this.revokationReason = chosenReasonOption.value;
    this.description = chosenReasonOption.description;
    this.reference = chosenReasonOption.reference;
  }

  onDateChange(event) {
    this.date = event;
  }
}
