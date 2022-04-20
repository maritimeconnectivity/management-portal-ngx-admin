import { NotifierService } from 'angular-notifier';
import { CertificateService } from './../../../../../shared/certificate.service';
import { RevokationReasonEnum, CertificateRevocation } from './../../../../../backend-api/identity-registry/model/certificateRevocation';
import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { DayCellComponent } from '../../../../extra-components/calendar/day-cell/day-cell.component';
import { getReasonOptionFromRevocationReason } from '../../../../../util/certRevokeInfo';
import { EntityType } from '../../../../models/menuType';

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
  revokationReason: RevokationReasonEnum;
  dayCellComponent = DayCellComponent;
  
  constructor(protected ref: NbDialogRef<CertRevokeDialogComponent>) {
    this.isLoading = false;
    for (const reason in RevokationReasonEnum) {
      this.reasons.push(getReasonOptionFromRevocationReason(reason.toLocaleLowerCase() as RevokationReasonEnum));
    }
  }

  doRevoke() {
    this.isLoading = true;
    const certificateRevocation = {
      revokedAt: this.date.getTime().toString(),
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
              'Error when trying to issue new certificate', err.message);
        });
  }
  ngOnInit(): void {
  }

  dismiss() {
    this.ref.close();
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
