import { InstanceControllerService } from '../../../backend-api/service-registry/api/instanceController.service';
import { SECOMService } from './../../../backend-api/secom/api/sECOM.service';
import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {
  @Input() instanceName: string;
  @Input() instanceMrn: string;
  @Input() instanceVersion: string;
  @Input() msrUrl: string;
  @Input() msrName: string;

  entityMrn = '';
  orgMrn = '';
  title = '';
  iconName = '';
  menyType = '';
  numberId = '';

  isLoading: boolean;

  constructor(protected ref: NbDialogRef<DetailModalComponent>,
    private instanceControllerService: InstanceControllerService,
    ) {
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.instanceControllerService.getInstanceByMRNAndVersion(this.instanceMrn, this.instanceVersion)
    .subscribe(res =>{
      console.log(res);
    })
  }

  dismiss() {
    this.ref.close();
  }
}
