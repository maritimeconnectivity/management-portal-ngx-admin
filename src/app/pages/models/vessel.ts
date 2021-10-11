export const VesselModel = {
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
}