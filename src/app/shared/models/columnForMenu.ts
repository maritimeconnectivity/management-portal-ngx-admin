import { convertTime } from '../../util/timeConverter';

export const ColumnForMenu = {
  device: {
    id: {
      title: 'ID',
      type: 'number',
      description: 'identifier',
    },
    mrn: {
      title: 'MRN',
      type: 'string',
      description: 'MCP MRN as unique identifer',
      visibleFrom: ['detail', 'list'],
      immutable: true,
      required: true,
      shortIdType: 'device',
    },
    name: {
      title: 'Name',
      type: 'string',
      description: 'Name of device',
      visibleFrom: ['detail', 'list'],
      required: true,
    },
    permissions: {
      title: 'Permissions',
      type: 'string',
      description: 'List of permissions assigned by the organization',
      visibleFrom: ['edit', 'detail'],
    },
    mrnSubsidiary: {
      title: 'Subsidiary MRN',
      type: 'string',
      description: 'Additional MRN assigned to entity',
      visibleFrom: ['detail'],
    },
    homeMMSUrl: {
      title: 'Home MMS URL',
      type: 'string',
      description: 'URL of home MMS',
      visibleFrom: ['detail'],
    },
    createdAt: {
      title: 'Created at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      immutable: true,
      notShowOnEdit: true,
      visibleFrom: ['detail'],
    },
    updatedAt: {
      title: 'Updated at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      immutable: true,
      notShowOnEdit: true,
      visibleFrom: ['detail', 'list'],
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
      description: 'MCP MRN as unique identifer',
      visibleFrom: ['detail', 'list'],
      immutable: true,
      required: true,
      shortIdType: 'organization',
    },
    name: {
      title: 'Name',
      type: 'string',
      description: 'Name of organization',
      visibleFrom: ['detail', 'list'],
      required: true,
    },
    mrnSubsidiary: {
      title: 'Subsidiary MRN',
      type: 'string',
      description: 'Additional MRN assigned to entity',
      visibleFrom: ['detail'],
    },
    homeMMSUrl: {
      title: 'Home MMS URL',
      type: 'string',
      description: 'URL of home MMS',
      visibleFrom: ['detail'],
    },
    email: {
      title: 'e-mail',
      type: 'string',
      description: 'Contact e-mail',
      visibleFrom: ['detail', 'list'],
      required: true,
    },
    url: {
      title: 'URL',
      type: 'string',
      description: 'URL of organization',
      visibleFrom: ['detail', 'list'],
      required: true,
    },
    address: {
      title: 'Address',
      type: 'string',
      description: 'Address of organization',
      visibleFrom: ['detail'],
      required: true,
    },
    country: {
      title: 'Country',
      type: 'string',
      description: 'Country that organization belongs to',
      visibleFrom: ['detail', 'list'],
      required: true,
    },
    federationType: {
      title: 'Federation type',
      type: 'string',
      description: 'OpenID Connect federation type',
      visibleFrom: ['detail'],
      immutable: true,
    },
    createdAt: {
      title: 'Created at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      immutable: true,
      notShowOnEdit: true,
      visibleFrom: ['detail'],
    },
    updatedAt: {
      title: 'Updated at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      immutable: true,
      notShowOnEdit: true,
      visibleFrom: ['detail', 'list'],
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
      description: 'MCP MRN as unique identifer',
      visibleFrom: ['detail', 'list'],
      immutable: true,
      required: true,
      shortIdType: 'service',
    },
    name: {
      title: 'Name',
      type: 'string',
      description: 'Name of service',
      visibleFrom: ['detail', 'list'],
      required: true,
    },
    permissions: {
      title: 'Permissions',
      type: 'string',
      description: 'List of permissions assigned by the organization',
      visibleFrom: ['edit', 'detail'],
    },
    mrnSubsidiary: {
      title: 'Subsidiary MRN',
      type: 'string',
      description: 'Additional MRN assigned to entity',
      visibleFrom: ['detail'],
    },
    homeMMSUrl: {
      title: 'Home MMS URL',
      type: 'string',
      description: 'URL of home MMS',
      visibleFrom: ['detail'],
    },
    instanceVersion: {
      title: 'Instance version',
      type: 'string',
      description: 'Version of service instance',
      visibleFrom: ['detail', 'list'],
      immutable: true,
      required: true,
    },
    oidcAccessType: {
      title: 'Access type',
      type: 'string',
      description: 'OpenID Connect access type',
      visibleFrom: ['detail'],
    },
    oidcClientId: {
      title: 'OIDC client ID',
      type: 'string',
      description: 'OpenID Connect client ID',
      visibleFrom: ['detail'],
    },
    vessel: {
      title: 'Vessel',
      type: 'string',
      description: 'Correlated vessel',
      visibleFrom: ['detail'],
    },
    createdAt: {
      title: 'Created at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      immutable: true,
      notShowOnEdit: true,
      visibleFrom: ['detail'],
    },
    updatedAt: {
      title: 'Updated at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      immutable: true,
      notShowOnEdit: true,
      visibleFrom: ['detail', 'list'],
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
      description: 'MCP MRN as unique identifer',
      visibleFrom: ['detail', 'list'],
      immutable: true,
      required: true,
      shortIdType: 'user',
    },
    firstName: {
      title: 'First name',
      type: 'string',
      visibleFrom: ['detail', 'list'],
      required: true,
    },
    lastName: {
      title: 'Last name',
      type: 'string',
      visibleFrom: ['detail', 'list'],
      required: true,
    },
    email: {
      title: 'e-mail',
      type: 'string',
      description: 'Contact e-mail',
      visibleFrom: ['detail', 'list'],
      immutable: true,
      required: true,
    },
    permissions: {
      title: 'Permissions',
      type: 'string',
      description: 'List of permissions assigned by the organization',
      visibleFrom: ['detail', 'list'],
    },
    mrnSubsidiary: {
      title: 'Subsidiary MRN',
      type: 'string',
      description: 'Additional MRN assigned to entity',
      visibleFrom: ['detail'],
    },
    homeMMSUrl: {
      title: 'Home MMS URL',
      type: 'string',
      description: 'URL of home MMS',
      visibleFrom: ['detail'],
    },
    createdAt: {
      title: 'Created at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      immutable: true,
      notShowOnEdit: true,
      visibleFrom: ['detail'],
    },
    updatedAt: {
      title: 'Updated at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      immutable: true,
      notShowOnEdit: true,
      visibleFrom: ['detail', 'list'],
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
      description: 'MCP MRN as unique identifer',
      visibleFrom: ['detail', 'list'],
      immutable: true,
      required: true,
      shortIdType: 'vessel',
    },
    name: {
      title: 'Name',
      type: 'string',
      description: 'Name of device',
      visibleFrom: ['detail', 'list'],
      required: true,
    },
    permissions: {
      title: 'Permissions',
      type: 'string',
      description: 'List of permissions assigned by the organization',
      visibleFrom: ['edit', 'detail'],
    },
    // vessel specific
    imoNumber: {
      title: 'IMO number',
      type: 'string',
      visibleFrom: ['detail', 'list'],
    },
    mmsiNumber: {
      title: 'MMSI number',
      type: 'string',
      visibleFrom: ['detail', 'list'],
    },
    callsign: {
      title: 'Call sign',
      type: 'string',
      visibleFrom: ['detail', 'list'],
    },
    flagstate: {
      title: 'Flag state',
      type: 'string',
      visibleFrom: ['detail', 'list'],
    },
    aisClass: {
      title: 'AIS class',
      type: 'string',
      visibleFrom: ['detail', 'list'],
    },
    portOfRegister: {
      title: 'Port of register',
      type: 'string',
      visibleFrom: ['detail', 'list'],
    },
    mrnSubsidiary: {
      title: 'Subsidiary MRN',
      type: 'string',
      description: 'Additional MRN assigned to entity',
      visibleFrom: ['detail'],
    },
    homeMMSUrl: {
      title: 'Home MMS URL',
      type: 'string',
      description: 'URL of home MMS',
      visibleFrom: ['detail'],
    },
    createdAt: {
      title: 'Created at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      immutable: true,
      notShowOnEdit: true,
      visibleFrom: ['detail'],
    },
    updatedAt: {
      title: 'Updated at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      immutable: true,
      notShowOnEdit: true,
      visibleFrom: ['detail', 'list'],
    },
  },
  role: {
    id: {
      title: 'ID',
      type: 'number',
    },
    permission: {
      title: 'Permission',
      type: 'string',
      visibleFrom: ['detail', 'list'],
      required: true,
    },
    roleName: {
      title: 'Role name',
      type: 'string',
      visibleFrom: ['detail', 'list'],
      options: [
        {
          title: 'ROLE_SITE_ADMIN',
          value: 'ROLE_SITE_ADMIN',
        },
        {
          title: 'ROLE_ORG_ADMIN',
          value: 'ROLE_ORG_ADMIN',
        },
        {
          title: 'ROLE_USER',
          value: 'ROLE_USER',
        },
        {
          title: 'ROLE_ENTITY_ADMIN',
          value: 'ROLE_ENTITY_ADMIN',
        },
        {
          title: 'ROLE_USER_ADMIN',
          value: 'ROLE_USER_ADMIN',
        },
        {
          title: 'ROLE_VESSEL_ADMIN',
          value: 'ROLE_VESSEL_ADMIN',
        },
        {
          title: 'ROLE_SERVICE_ADMIN',
          value: 'ROLE_SERVICE_ADMIN',
        },
        {
          title: 'ROLE_APPROVE_ORG',
          value: 'ROLE_APPROVE_ORG',
        },
        {
          title: 'ROLE_DEVICE_ADMIN',
          value: 'ROLE_DEVICE_ADMIN',
        },
        {
          title: 'ROLE_MMS_ADMIN',
          value: 'ROLE_MMS_ADMIN',
        },
      ],
      required: true,
    },
    createdAt: {
      title: 'Created at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      immutable: true,
      notShowOnEdit: true,
      visibleFrom: ['detail'],
    },
    updatedAt: {
      title: 'Updated at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      immutable: true,
      notShowOnEdit: true,
      visibleFrom: ['detail', 'list'],
    },
  },
  orgcandidate: {
    id: {
      title: 'ID',
      type: 'number',
    },
    mrn: {
      title: 'MRN',
      type: 'string',
      description: 'MCP MRN as unique identifer',
      visibleFrom: ['detail', 'list'],
      shortIdType: 'organization',
      immutable: true,
      required: true,
    },
    name: {
      title: 'Name',
      type: 'string',
      description: 'Name of organization',
      visibleFrom: ['detail', 'list'],
      required: true,
    },
    mrnSubsidiary: {
      title: 'Subsidiary MRN',
      type: 'string',
      description: 'Additional MRN assigned to entity',
      visibleFrom: ['detail'],
    },
    homeMMSUrl: {
      title: 'Home MMS URL',
      type: 'string',
      description: 'URL of home MMS',
      visibleFrom: ['detail'],
    },
    email: {
      title: 'e-mail',
      type: 'string',
      description: 'Contact e-mail',
      visibleFrom: ['detail', 'list'],
      required: true,
    },
    url: {
      title: 'URL',
      type: 'string',
      description: 'URL of organization',
      visibleFrom: ['detail', 'list'],
      required: true,
    },
    address: {
      title: 'Address',
      type: 'string',
      description: 'Address of organization',
      visibleFrom: ['detail'],
      required: true,
    },
    country: {
      title: 'Country',
      type: 'string',
      description: 'Country that organization belongs to',
      visibleFrom: ['detail', 'list'],
      required: true,
    },
    federationType: {
      title: 'Federation type',
      type: 'string',
      description: 'OpenID Connect federation type',
      visibleFrom: ['detail'],
      immutable: true,
    },
    createdAt: {
      title: 'Created at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      immutable: true,
      notShowOnEdit: true,
      visibleFrom: ['detail'],
    },
    updatedAt: {
      title: 'Updated at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      immutable: true,
      notShowOnEdit: true,
      visibleFrom: ['detail', 'list'],
    },
  },
  instance: {
    id: {
      title: 'ID',
      type: 'number',
    },
    name: {
      title: 'Name',
      type: 'string',
      description: 'Name of service instance',
      visibleFrom: ['detail', 'list'],
      required: true,
    },
    version: {
      title: 'Version',
      type: 'string',
      description: 'Version of service instance',
      visibleFrom: ['detail', 'list'],
      required: true,
    },
    comment: {
      title: 'Comment',
      type: 'string',
      visibleFrom: ['detail'],
      required: true,
    },
    serviceType: {
      title: 'Service type',
      type: 'string',
      options: [
        {
          title: 'MS 1 - VTS Information service (INS)',
          value: 'VTSInformationService',
        },
        {
          title: 'MS 2 - VTS Navigational assistance service (NAS)',
          value: 'VTSNavigationalAssistanceService',
        },
        {
          title: 'MS 3 - Traffic organization service (TOS)',
          value: 'TrafficOrganizationService',
        },
        {
          title: 'MS 4 - Port support service (PSS)',
          value: 'PortSupportService',
        },
        {
          title: 'MS 5 - Maritime safety information (MSI) service',
          value: 'MaritimeSafetyInformationService',
        },
        {
          title: 'MS 6 - Pilotage service',
          value: 'PilotageService',
        },
        {
          title: 'MS 7 - Tug service',
          value: 'TugService',
        },
        {
          title: 'MS 8 - Vessel shore reporting',
          value: 'VesselShoreReporting',
        },
        {
          title: 'MS 9 - Telemedical assistance service (TMAS)',
          value: 'TelemedicalAssistanceService',
        },
        {
          title: 'MS 10 - Maritime assistance service (MAS)',
          value: 'MaritimeAssistanceService',
        },
        {
          title: 'MS 11 - Nautical chart service',
          value: 'NauticalChartService',
        },
        {
          title: 'MS 12 - Nautical publications service',
          value: 'NauticalPublicationsService',
        },
        {
          title: 'MS 13 - Ice navigation service',
          value: 'IceNavigationService',
        },
        {
          title: 'MS 14 - Meteorological information service',
          value: 'MeteorologicalInformationService',
        },
        {
          title: 'MS 15 - Real-time hydrographic and environmental information services',
          value: 'RealTimeHydrographicAndEnvironmentalInformationServices',
        },
        {
          title: 'MS 16 - Search and rescue (SAR) service',
          value: 'SearchAndRescueService',
        },
        {
          title: 'Other',
          value: 'other:etc',
        },
      ],
      description: 'The service type shall reflect the associated operational service type provided according to defined types',
      visibleFrom: ['detail', 'list'],
      convertToBeArray: true,
    },
    status: {
      title: 'Status',
      type: 'string',
      options: [
        {
          title: 'Provisional',
          value: 'PROVISIONAL',
        },
        {
          title: 'Released',
          value: 'RELEASED',
        },
        {
          title: 'Deprecated',
          value: 'DEPRECATED',
        },
        {
          title: 'Deleted',
          value: 'DELETED',
        },
      ],
      visibleFrom: ['detail', 'list'],
      required: true,
    },
    endpointUri: {
      title: 'Endpoint URI',
      type: 'string',
      visibleFrom: ['detail'],
      required: true,
    },
    organizationId: {
      title: 'Organization ID',
      type: 'string',
      visibleFrom: ['detail'],
      immutable: true,
    },
    keywords: {
      title: 'Keywords',
      type: 'string',
      visibleFrom: ['detail', 'list'],
      convertToBeArray: true,
    },
    instanceId: {
      title: 'Instance ID',
      type: 'string',
      description: 'MCP MRN as unique identifer',
      visibleFrom: ['detail'],
      shortIdType: 'instance',
      required: true,
    },
    implementsServiceDesign: {
      title: 'Technical design ID',
      type: 'string',
      description: 'MCP MRN as unique identifer',
      visibleFrom: ['detail'],
      shortIdType: 'design',
    },
    implementsServiceDesignVersion: {
      title: 'Technical design version',
      type: 'string',
      description: 'MCP MRN as unique identifer',
      visibleFrom: ['detail'],
    },
    geometryContentType: {
      title: 'Geometry content type',
      type: 'string',
      visibleFrom: ['detail'],
    },
    geometry: {
      title: 'Geometry',
      type: 'object',
      visibleFrom: [],
    },
    unlocode: {
      title: 'Unlocode',
      type: 'string',
      visibleFrom: ['detail'],
    },
    endpointType: {
      title: 'Endpoint type',
      type: 'string',
      visibleFrom: ['detail'],
    },
    mmsi: {
      title: 'MMSI',
      type: 'string',
      visibleFrom: ['detail'],
    },
    imo: {
      title: 'IMO number',
      type: 'string',
      visibleFrom: ['detail'],
    },
    instanceAsXml: {
      title: 'Instance as Xml',
      type: 'xml',
      notShowOnEdit: true,
      visibleFrom: ['detail'],
    },
    instanceAsDocId: {
      title: 'Instance as DocId',
      type: 'number',
    },
    instanceAsDocName: {
      title: 'Instance as DocName',
      type: 'string',
      visibleFrom: ['detail'],
    },
    instanceAsDoc: {
      title: 'Document file',
      type: 'file',
      visibleFrom: ['detail'],
    },
    ledgerRequestId: {
      title: 'Ledger Request ID',
      type: 'number',
    },
    ledgerRequestStatus: {
      title: 'Ledger Request status',
      type: 'string',
      options: [
        {
          title: 'Inactive',
          value: 'INACTIVE',
        },
        {
          title: 'Created',
          value: 'CREATED',
        },
        {
          title: 'Vetting',
          value: 'VETTING',
        },
        {
          title: 'Vetted',
          value: 'VETTED',
        },
        {
          title: 'Requesting',
          value: 'REQUESTING',
        },
        {
          title: 'Succeeded',
          value: 'SUCCEEDED',
        },
        {
          title: 'Failed',
          value: 'FAILED',
        },
        {
          title: 'Rejected',
          value: 'REJECTED',
        },
      ],
      visibleFrom: ['detail'],
    },
    docIds: {
      title: 'Document IDs',
      type: 'number',
    },
    publishedAt: {
      title: 'Created at',
      type: 'string',
      filter: false,
      immutable: true,
      notShowOnEdit: true,
      visibleFrom: ['detail'],
    },
    lastUpdatedAt: {
      title: 'Updated at',
      type: 'string',
      filter: false,
      immutable: true,
      notShowOnEdit: true,
      visibleFrom: ['detail'],
    },
  },
  newOrganization: {
    orgMrn: {
      title: 'Maritime Resource Name (MRN) for organization',
      type: 'string',
      description: 'MCP MRN as unique identifer',
      visibleFrom: ['detail'],
      required: true,
      shortIdType: 'organization',
    },
    orgName: {
      title: 'Organization name',
      type: 'string',
      description: 'Name of organization',
      visibleFrom: ['detail'],
      required: true,
    },
    orgEmail: {
      title: 'Organization contact e-mail',
      type: 'string',
      description: 'Contact e-mail',
      placeholder: 'non-personal email, e.g., info@example.org',
      visibleFrom: ['detail'],
      required: true,
    },
    orgUrl: {
      title: 'URL of organization',
      type: 'string',
      description: 'URL of organization',
      visibleFrom: ['detail'],
      required: true,
    },
    orgAddress: {
      title: 'Address of organization',
      type: 'string',
      description: 'Address of organization',
      visibleFrom: ['detail'],
      required: true,
    },
    orgCountry: {
      title: 'Country of organization',
      type: 'string',
      description: 'Country that organization belongs to',
      visibleFrom: ['detail'],
      required: true,
    },
    /*
    adminMrn: {
      title: 'MRN for admin user',
      type: 'string',
      description: 'MCP MRN as unique identifer',
      visibleFrom: ['detail'],
      required: true,
      shortIdType: 'user',
    },
    adminFirstName: {
      title: 'First name of admin user',
      type: 'string',
      description: 'First name',
      placeholder: 'anonymized first name',
      visibleFrom: ['detail'],
      required: true,
    },
    adminLastName: {
      title: 'Last name of admin user',
      type: 'string',
      description: 'Last name',
      placeholder: 'anonymized last name',
      visibleFrom: ['detail'],
      required: true,
    },
    adminEmail: {
      title: 'e-mail of admin user',
      type: 'string',
      description: 'Contact e-mail to admin user',
      placeholder: 'non-personal email, e.g., admin@example.org',
      visibleFrom: ['detail'],
      required: true,
    },
    */
  },
};
