import { NotifierService } from 'angular-notifier';
import { Organization } from './../../backend-api/identity-registry/model/organization';
import { OrganizationControllerService } from './../../backend-api/identity-registry/api/organizationController.service';
import { AppConfig } from './../../app.config';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ColumnForMenu } from '../../shared/models/columnForMenu';

@Component({
  selector: 'ngx-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {
  title = 'Requested information to join';
  menuType = 'newOrganization';
  isForNew = true;
  environmentName: string;
  clause: string;
  agreed = false;
  submitted = false;

  constructor(
    protected ref: NbDialogRef<RegisterDialogComponent>,
    private organizationControllerService: OrganizationControllerService,
    private notifierService: NotifierService,
    ) {
    this.environmentName = AppConfig.ENVIRONMENT_TITLE;
    this.clause = AppConfig.TERMS_OF_USE;
  }

  ngOnInit(): void {
  }

  dismiss(): void {
    this.ref.close();
  }

  agree(): void {
    this.agreed = true;
  }

  submit(value: any): void {
    const organization: Organization = {
      name: value.orgName,
      mrn: value.orgMrn,
      email: value.orgEmail,
      url: value.orgUrl,
      country: value.orgCountry,
      address: value.orgAddress,
    };
    this.organizationControllerService.applyOrganization(organization).subscribe(
      res => {
        this.submitted = true;
      },
      err => {console.log(err); this.notifierService.notify('error', 'There was error in registration of information - ' + err.error.message);}
    );
    
    
  }
}
