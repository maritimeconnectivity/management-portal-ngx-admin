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

import { MmsControllerService } from '../backend-api/identity-registry/api/mmsController.service';
import { VesselControllerService } from '../backend-api/identity-registry/api/vesselController.service';
import { UserControllerService } from '../backend-api/identity-registry/api/userController.service';
import { ServiceControllerService } from '../backend-api/identity-registry/api/serviceController.service';
import { DeviceControllerService } from '../backend-api/identity-registry/api/deviceController.service';
import { OrganizationControllerService } from '../backend-api/identity-registry/api/organizationController.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CertificateBundle, CertificateRevocation } from '../backend-api/identity-registry';
import { getReasonOptionFromRevocationReason } from '../util/certRevokeInfo';
import { EntityType } from './models/menuType';

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  constructor(
    private organizationsService: OrganizationControllerService,
    private devicesService: DeviceControllerService,
    private servicesService: ServiceControllerService,
    private usersService: UserControllerService,
    private vesselsService: VesselControllerService,
    private mmsService: MmsControllerService) {
  }

  ngOnInit() {

  }

  public formatCerts(certificates: any[]): any[] {
    let formatted = [];
    for(const key_certs in certificates) {
      const cert = certificates[key_certs];
      for (const key in cert) {
        certificates[key_certs][key] = cert[key];
      }
      if (cert['revoked']) {
        cert["revokeInfo"] = cert["revokedAt"];
        cert["revokeReasonText"] = getReasonOptionFromRevocationReason(cert["revokeReason"]).title;
      }
      formatted.push(cert);
    }
    return formatted;
  }

  public splitByRevokeStatus(certificates: any[]): any {
    let activeCertificates = [];
    let revokedCertificates = [];
    for(const key_certs in certificates) {
      const cert = certificates[key_certs];
      cert['revoked'] ? revokedCertificates.push(cert) : activeCertificates.push(cert);
    }
    activeCertificates.sort((a,b) => a.end - b.end);
    revokedCertificates.sort((a,b) => a.end - b.end);
    return {
      activeCertificates: this.formatCerts(activeCertificates),
      revokedCertificates: this.formatCerts(revokedCertificates),
    };
  }

  public issueNewCertificateFromMIR(entityType: EntityType, entityMrn: string, orgMrn: string, version?: string)
            : Observable<CertificateBundle> {
		if (entityType == null || !entityMrn) { // We lost our state data somehow???
			throw new Error('Internal state lost');
		}
		switch (entityType) {
      case EntityType.Organization: {
        return this.organizationsService.newOrgCert(entityMrn);
      }
      case EntityType.Device: {
        return this.devicesService.newDeviceCert(orgMrn, entityMrn);
      }
      case EntityType.Service: {
        return this.servicesService.newServiceCert(orgMrn, entityMrn, version);
      }
      case EntityType.User: {
        return this.usersService.newUserCert(orgMrn, entityMrn);
      }
      case EntityType.Vessel: {
        return this.vesselsService.newVesselCert(orgMrn, entityMrn);
      }
      case EntityType.MMS: {
        return this.mmsService.newMMSCert(orgMrn, entityMrn);
      }
    }
	}

	public issueNewCertificate(csr: string, entityType: EntityType, entityMrn: string, orgMrn: string, version?: string)
            : Observable<string> {
		if (entityType == null || !entityMrn) { // We lost our state data somehow???
			throw new Error('Internal state lost');
		}
		switch (entityType) {
      case EntityType.Organization: {
        return this.organizationsService.newOrgCertFromCsr(csr, entityMrn);
      }
      case EntityType.Device: {
        return this.devicesService.newDeviceCertFromCsr(csr, orgMrn, entityMrn);
      }
      case EntityType.Service: {
        return this.servicesService.newServiceCertFromCsr(csr, orgMrn, entityMrn, version);
      }
      case EntityType.User: {
        return this.usersService.newUserCertFromCsr(csr, orgMrn, entityMrn);
      }
      case EntityType.Vessel: {
        return this.vesselsService.newVesselCertFromCsr(csr, orgMrn, entityMrn);
      }
      case EntityType.MMS: {
        return this.mmsService.newMMSCertFromCsr(csr, orgMrn, entityMrn);
      }
    }
	}

	public revokeCertificate(entityType: EntityType, entityMrn:string, orgMrn: string,
      certificateId:number, certificateRevocation:CertificateRevocation, version?: string) : Observable<any> {
		if (entityType == null || !entityMrn) { // We lost our state data somehow???
			throw new Error('Internal state lost');
		}

		switch (entityType) {
      case EntityType.Organization: {
        return this.organizationsService.revokeOrgCert(certificateRevocation, entityMrn, certificateId);
      }
      case EntityType.Device: {
        return this.devicesService.revokeDeviceCert(certificateRevocation, orgMrn, entityMrn, certificateId);
      }
      case EntityType.Service: {
        return this.servicesService.revokeServiceCert(certificateRevocation, orgMrn, entityMrn, version, certificateId);
      }
      case EntityType.User: {
        return this.usersService.revokeUserCert(certificateRevocation, orgMrn, entityMrn, certificateId);
      }
      case EntityType.Vessel: {
        return this.vesselsService.revokeVesselCert(certificateRevocation, orgMrn, entityMrn, certificateId);
      }
      case EntityType.MMS: {
        return this.mmsService.revokeMMSCert(certificateRevocation, orgMrn, entityMrn, certificateId);
      }
    }
	}
}
