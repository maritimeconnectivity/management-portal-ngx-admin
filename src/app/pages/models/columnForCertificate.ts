export const ActiveCertificatesColumn = {
    id: {
        title: 'ID',
        type: 'number',
      },
    start: {
      title: 'Valid from',
      type: 'string',
    },
    end: {
      title: 'Valid until',
      type: 'string',
    },
}

export const RevokedCertificatesColumn = {
  id: {
      title: 'ID',
      type: 'number',
    },
  revokeInfo: {
    title: 'Revoked from',
    type: 'string',
  },
  revokeReasonText: {
    title: 'Reason',
    type: 'string',
  },
}