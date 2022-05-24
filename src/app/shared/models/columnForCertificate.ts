import { convertTime } from "../../util/timeConverter";

export const ActiveCertificatesColumn = {
    start: {
      title: 'Valid from',
      type: 'string',
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
    },
    end: {
      title: 'Valid until',
      type: 'string',
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
    },
}

export const RevokedCertificatesColumn = {
  revokeInfo: {
    title: 'Revoked from',
    type: 'string',
    valuePrepareFunction: (timestamp: any) => {
      return convertTime(timestamp);
    },
  },
  revokeReasonText: {
    title: 'Reason',
    type: 'string',
  },
}