export const ColumnForEntity = {
    device: {
        id: {
            title: 'ID',
            type: 'number',
          },
          mrn: {
            title: 'MRN',
            type: 'string',
          },
          name: {
            title: 'Name',
            type: 'string',
          },
          createdAt: {
            title: 'Created at',
            type: 'string',
          },
          updatedAt: {
            title: 'Updated at',
            type: 'string',
          },
          permissions: {
            title: 'Permissions',
            type: 'string',
          },
          mrnSubsidiary: {
            title: 'Subsidiary MRN',
            type: 'string',
          },
          homeMMSUrl: {
            title: 'Home MMS URL',
            type: 'string',
          },
    },
    organization: {
        id: {
            title: 'ID',
            type: 'number',
          },
          mrn: {
            title: 'MRN',
            type: 'string',
          },
          name: {
            title: 'Name',
            type: 'string',
          },
          createdAt: {
            title: 'Created at',
            type: 'string',
          },
          updatedAt: {
            title: 'Updated at',
            type: 'string',
          },
          mrnSubsidiary: {
            title: 'Subsidiary MRN',
            type: 'string',
          },
          homeMMSUrl: {
            title: 'Home MMS URL',
            type: 'string',
          },
          email: {
            title: 'e-mail',
            type: 'string',
          },
          url: {
            title: 'URL',
            type: 'string',
          },
          address: {
            title: 'Address',
            type: 'string',
          },
          country: {
            title: 'Country',
            type: 'string',
          },
          federationType: {
            title: 'Federation type',
            type: 'string',
          },
    },
    service: {
        id: {
            title: 'ID',
            type: 'number',
          },
          mrn: {
            title: 'MRN',
            type: 'string',
          },
          name: {
            title: 'Name',
            type: 'string',
          },
          createdAt: {
            title: 'Created at',
            type: 'string',
          },
          updatedAt: {
            title: 'Updated at',
            type: 'string',
          },
          permissions: {
            title: 'Permissions',
            type: 'string',
          },
          mrnSubsidiary: {
            title: 'Subsidiary MRN',
            type: 'string',
          },
          homeMMSUrl: {
            title: 'Home MMS URL',
            type: 'string',
          },
          instanceVersion: {
            title: 'Instance version',
            type: 'string',
          },
          oidcAccessType: {
            title: 'Access type',
            type: 'string',
          },
          oidcClientId: {
            title: 'OIDC client ID',
            type: 'string',
          },
          vessel: {
            title: 'Vessel',
            type: 'string',
          },
    },
    user: {
        id: {
            title: 'ID',
            type: 'number',
          },
          mrn: {
            title: 'MRN',
            type: 'string',
          },
          firstName: {
            title: 'First name',
            type: 'string',
          },
          lastName: {
            title: 'Last name',
            type: 'string',
          },
          email: {
            title: 'e-mail',
            type: 'string',
          },
          createdAt: {
            title: 'Created at',
            type: 'string',
          },
          updatedAt: {
            title: 'Updated at',
            type: 'string',
          },
          permissions: {
            title: 'Permissions',
            type: 'string',
          },
          mrnSubsidiary: {
            title: 'Subsidiary MRN',
            type: 'string',
          },
          homeMMSUrl: {
            title: 'Home MMS URL',
            type: 'string',
          },
    },
    vessel: {
        id: {
            title: 'ID',
            type: 'number',
          },
          mrn: {
            title: 'MRN',
            type: 'string',
          },
          name: {
            title: 'Name',
            type: 'string',
          },
          createdAt: {
            title: 'Created at',
            type: 'string',
          },
          updatedAt: {
            title: 'Updated at',
            type: 'string',
          },
          permissions: {
            title: 'Permissions',
            type: 'string',
          },
          mrnSubsidiary: {
            title: 'Subsidiary MRN',
            type: 'string',
          },
          homeMMSUrl: {
            title: 'Home MMS URL',
            type: 'string',
          },
          // vessel specific
          imoNumber: {
            title: 'IMO number',
            type: 'string',
          },
          mmsiNumber: {
            title: 'MMSI number',
            type: 'string',
          },
          callsign: {
            title: 'Call sign',
            type: 'string',
          },
          flagstate: {
            title: 'Flag state',
            type: 'string',
          },
          aisClass: {
            title: 'AIS class',
            type: 'string',
          },
          portOfRegister: {
            title: 'Port of register',
            type: 'string',
          },
    },
}