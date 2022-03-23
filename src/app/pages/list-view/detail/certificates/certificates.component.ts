import { ActiveCertificatesColumn, RevokedCertificatesColumn } from '../../../models/columnForCertificate';
import { Component, Input, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Certificate, CertificateBundle, PemCertificate } from '../../../../backend-api/identity-registry';
import { FileHelperService } from '../../../../shared/file-helper.service';
import { NotifierService } from 'angular-notifier';
import { CertificateEntityType } from '../../../models/certEntityType';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
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
    }
  };

  source: LocalDataSource = new LocalDataSource();

  @Input() data: any[];
  @Input() forRevoked: boolean;

  certificateTitle = "Certificate for ";

  constructor(private notifierService: NotifierService, private fileHelper: FileHelperService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.forRevoked) {
      this.settings['actions'] = undefined;
      this.settings['columns'] = RevokedCertificatesColumn;
    } else {
      this.settings['columns'] = ActiveCertificatesColumn;
    }
  }

  onEdit(event): void {
    this.download(event.data);
  }

  onDelete(event): void {
    if (window.confirm('Are you sure you want to revoke the certificate?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  download(certificate:Certificate) {
    let pemCertificate:PemCertificate = {certificate:certificate.certificate};
    let certBundle:CertificateBundle = {pemCertificate:pemCertificate};
    this.route.queryParams.subscribe(e => {
      this.fileHelper.downloadPemCertificate(certBundle, "Certificate for " + e.name, true, this.notifierService);
    });
    
  }

  /*
  navigateToIssueNewCertificate(entityType: CertificateEntityType, entityMrn:string, entityTitle: string) {
    this.path = '/issuecert';
    var pathElement = "";
    switch (entityType) {
        case CertificateEntityType.Device: {
            pathElement = "devices";
            break;
        }
        case CertificateEntityType.Organization: {
            pathElement = "my-organization";
            break;
        }
        case CertificateEntityType.Service: {
            pathElement = "instances";
            break;
        }
        case CertificateEntityType.User: {
            pathElement = "users";
            break;
        }
        case CertificateEntityType.Vessel: {
            pathElement = "vessels";
            break;
        }
        default: {
            this.notificationService.generateNotification("Error", "Error when trying to navigate to issue new certificate.\n Missing: " + entityType, MCNotificationType.Error);
            return;
        }
    }
    this.generatePath(pathElement, pagesMenu[0]);

    this.router.navigate([this.path], { queryParams: { entityType: entityType, entityMrn: entityMrn, entityTitle:entityTitle}});
}

navigateToRevokeCertificate(entityType: CertificateEntityType, entityMrn:string, entityTitle: string, certificateId:string) {
    this.pathBeforeCerticates = this.router.url;
    this.path = '/revokecert';
    var pathElement = "";
    switch (entityType) {
        case CertificateEntityType.Device: {
            pathElement = "devices";
            break;
        }
        case CertificateEntityType.Organization: {
            pathElement = "my-organization";
            break;
        }
        case CertificateEntityType.Service: {
            pathElement = "instances";
            break;
        }
        case CertificateEntityType.User: {
            pathElement = "users";
            break;
        }
        case CertificateEntityType.Vessel: {
            pathElement = "vessels";
            break;
        }
        default: {
            this.notificationService.generateNotification("Error", "Error when trying to navigate to revoke certificate.\n Missing: " + entityType, MCNotificationType.Error);
            return;
        }
    }
    this.generatePath(pathElement, pagesMenu[0]);

    this.router.navigate([this.path], { queryParams: { entityType: entityType, entityMrn: entityMrn, entityTitle:entityTitle, certId:certificateId}});
}
*/
}
