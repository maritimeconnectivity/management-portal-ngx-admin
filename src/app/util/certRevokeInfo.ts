import { RevokationReasonEnum } from './../backend-api/identity-registry/model/certificateRevocation';
export interface ReasonOption {
  value: RevokationReasonEnum;
  title: string;
  description: string;
}

// reference: https://www.itu.int/rec/dologin_pub.asp?lang=e&id=T-REC-X.509-201210-S!!PDF-E&type=items
export const getReasonOptionFromRevocationReason = (revocationReason:RevokationReasonEnum): ReasonOption => {
    switch (revocationReason) {
      case RevokationReasonEnum.Aacompromise: {
        return { value: revocationReason, title: 'AA compromised', description: 'It is known or suspected that aspects of the AA validated in the attribute certificate have been compromised' };
      }
      case RevokationReasonEnum.Affiliationchanged: {
        return { value: revocationReason, title: 'Afiliation changed', description: 'The subject\'s name or other information in the certificate has been modified but there is no cause to suspect that the private key has been compromised' };
      }
      case RevokationReasonEnum.Cacompromise: {
        return { value: revocationReason, title: 'CA compromised', description: 'A CA certificate is compromised' };
      }
      case RevokationReasonEnum.Certificatehold: {
        return { value: revocationReason, title: 'Certificate Hold', description: 'A certificate needs to be put on hold temporarily' };
      }
      case RevokationReasonEnum.Cessationofoperation: {
        return { value: revocationReason, title: 'Cessation of Operation', description: 'An issued certificate is replaced' };
      }
      case RevokationReasonEnum.Keycompromise: {
        return { value: revocationReason, title: 'Key compromised', description: 'It is known or suspected that the subject\'s private key, or other aspects of the subject validated in the certificate, have been compromised' };
      }
      case RevokationReasonEnum.Privilegewithdrawn: {
        return { value: revocationReason, title: 'Privilege withdrawn', description: 'A certificate (public-key or attribute certificate) was revoked because a privilege contained within that certificate has been withdrawn' };
      }
      case RevokationReasonEnum.Removefromcrl: {
        return { value: revocationReason, title: 'Remove from CRL', description: 'A CA is removed from the network' };
      }
      case RevokationReasonEnum.Superseded: {
        return { value: revocationReason, title: 'Superseded', description: 'The certificate has been superseded but there is no cause to suspect that the private key has been compromised' };
      }
      case RevokationReasonEnum.Unspecified: {
        return { value: revocationReason, title: 'Unspecified', description: 'Revoke certificates for reasons other than the specific codes' };
      }
      default : {
        return { value: revocationReason,
          title: RevokationReasonEnum[revocationReason],
          description: 'No description' };
      }
    }
  }