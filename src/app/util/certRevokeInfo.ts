import { RevokationReasonEnum } from './../backend-api/identity-registry/model/certificateRevocation';
export const getRevokeReasonTextFromRevocationReason = (revocationReason:RevokationReasonEnum):string => {
    var reasonText = '';
    switch (revocationReason) {
      case RevokationReasonEnum.Aacompromise: {
        reasonText = 'AA compromised';
        break;
      }
      case RevokationReasonEnum.Affiliationchanged: {
        reasonText = 'Afiliation changed';
        break;
      }
      case RevokationReasonEnum.Cacompromise: {
        reasonText = 'CA compromised';
        break;
      }
      case RevokationReasonEnum.Certificatehold: {
        reasonText = 'Certificate Hold';
        break;
      }
      case RevokationReasonEnum.Cessationofoperation: {
        reasonText = 'Cessation of Operation';
        break;
      }
      case RevokationReasonEnum.Keycompromise: {
        reasonText = 'Key compromised';
        break;
      }
      case RevokationReasonEnum.Privilegewithdrawn: {
        reasonText = 'Privilege withdrawn';
        break;
      }
      case RevokationReasonEnum.Removefromcrl: {
        reasonText = 'Remove from CRL';
        break;
      }
      case RevokationReasonEnum.Superseded: {
        reasonText = 'Superseded';
        break;
      }
      case RevokationReasonEnum.Unspecified: {
        reasonText = 'Unspecified';
        break;
      }
      default : {
        reasonText = RevokationReasonEnum[revocationReason];
      }
    }
    return reasonText;
  }