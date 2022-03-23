import { ActiveCertificatesColumn, RevokedCertificatesColumn } from '../../../models/columnForCertificate';
import { Component, Input, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Certificate, CertificateBundle, PemCertificate } from '../../../../backend-api/identity-registry';
import { FileHelperService } from '../../../../shared/file-helper.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'ngx-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit {

  ngOnInit(): void {
    if (this.forRevoked) {
      this.settings['actions'] = undefined;
      this.settings['columns'] = RevokedCertificatesColumn;
    } else {
      this.settings['columns'] = ActiveCertificatesColumn;
    }
  }

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
  // @Input() owner: string;
  certificateTitle = "Certificate for ";

  constructor(private notifierService: NotifierService, private fileHelper: FileHelperService) {
  }

  onEdit(event): void {
    this.download(event.data.certificate);
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
    this.fileHelper.downloadPemCertificate(certBundle, this.certificateTitle, true, this.notifierService);
  }
}
