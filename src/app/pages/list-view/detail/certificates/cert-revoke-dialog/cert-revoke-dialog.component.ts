import { RevokationReasonEnum } from './../../../../../backend-api/identity-registry/model/certificateRevocation';
import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { DayCellComponent } from '../../../../extra-components/calendar/day-cell/day-cell.component';
import { getReasonOptionFromRevocationReason } from '../../../../../util/certRevokeInfo';

@Component({
  selector: 'ngx-cert-revoke-dialog',
  templateUrl: './cert-revoke-dialog.component.html',
  styleUrls: ['./cert-revoke-dialog.component.scss'],
})
export class CertRevokeDialogComponent implements OnInit {

  @Input() entityMrn: string;
  @Input() entityTitle: string;
  entityType: string;
  isLoading: boolean;
  date = new Date();
  reasons = [];
  description = '';
  dayCellComponent = DayCellComponent;
  
  constructor(protected ref: NbDialogRef<CertRevokeDialogComponent>) {
    RevokationReasonEnum
    for (const reason in RevokationReasonEnum) {
      this.reasons.push(getReasonOptionFromRevocationReason(reason.toLocaleLowerCase() as RevokationReasonEnum));
    }
  }

  ngOnInit(): void {
  }

  dismiss() {
    this.ref.close();
  }

  onMenuItemSelected(event) {
    this.description = getReasonOptionFromRevocationReason(event).description;
  }

}
