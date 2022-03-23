import { convertTime } from '../../util/timeConverter';

export const ColumnForMenu = {
  device: {
    id: {
      title: 'ID',
      type: 'number',
      description: 'identifier',
    },
    mrn: {
      title: 'Maritime Resource Name (MRN)',
      type: 'string',
      description: 'MCP MRN as unique identifer',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    name: {
      title: 'Name',
      type: 'string',
      description: 'Name of device',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
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
      visibleFrom: ['create', 'edit', 'detail'],
    },
    homeMMSUrl: {
      title: 'Home MMS URL',
      type: 'string',
      description: 'URL of home MMS',
      visibleFrom: ['create', 'edit', 'detail'],
    },
    createdAt: {
      title: 'Created at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      visibleFrom: ['detail'],
    },
    updatedAt: {
      title: 'Updated at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      visibleFrom: ['detail', 'list'],
    },
  },
  organization: {
    id: {
      title: 'ID',
      type: 'number',
    },
    mrn: {
      title: 'Maritime Resource Name (MRN)',
      type: 'string',
      description: 'MCP MRN as unique identifer',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    name: {
      title: 'Name',
      type: 'string',
      description: 'Name of organization',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    mrnSubsidiary: {
      title: 'Subsidiary MRN',
      type: 'string',
      description: 'Additional MRN assigned to entity',
      visibleFrom: ['create', 'edit', 'detail'],
    },
    homeMMSUrl: {
      title: 'Home MMS URL',
      type: 'string',
      description: 'URL of home MMS',
      visibleFrom: ['create', 'edit', 'detail'],
    },
    email: {
      title: 'e-mail',
      type: 'string',
      description: 'Contact e-mail',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    url: {
      title: 'URL',
      type: 'string',
      description: 'URL of organization',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    address: {
      title: 'Address',
      type: 'string',
      description: 'Address of organization',
      visibleFrom: ['create', 'edit', 'detail'],
    },
    country: {
      title: 'Country',
      type: 'string',
      description: 'Country that organization belongs to',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    federationType: {
      title: 'Federation type',
      type: 'string',
      description: 'OpenID Connect federation type',
      visibleFrom: ['create', 'edit', 'detail'],
    },
    createdAt: {
      title: 'Created at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      visibleFrom: ['detail'],
    },
    updatedAt: {
      title: 'Updated at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      visibleFrom: ['detail', 'list'],
    },
  },
  service: {
    id: {
      title: 'ID',
      type: 'number',
    },
    mrn: {
      title: 'Maritime Resource Name (MRN)',
      type: 'string',
      description: 'MCP MRN as unique identifer',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    name: {
      title: 'Name',
      type: 'string',
      description: 'Name of service',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
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
      visibleFrom: ['create', 'edit', 'detail'],
    },
    homeMMSUrl: {
      title: 'Home MMS URL',
      type: 'string',
      description: 'URL of home MMS',
      visibleFrom: ['create', 'edit', 'detail'],
    },
    instanceVersion: {
      title: 'Instance version',
      type: 'string',
      description: 'Version of service instance',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    oidcAccessType: {
      title: 'Access type',
      type: 'string',
      description: 'OpenID Connect access type',
      visibleFrom: ['create', 'edit', 'detail'],
    },
    oidcClientId: {
      title: 'OIDC client ID',
      type: 'string',
      description: 'OpenID Connect client ID',
      visibleFrom: ['create', 'edit', 'detail'],
    },
    vessel: {
      title: 'Vessel',
      type: 'string',
      description: 'Correlated vessel',
      visibleFrom: ['create', 'edit', 'detail'],
    },
    createdAt: {
      title: 'Created at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      visibleFrom: ['detail'],
    },
    updatedAt: {
      title: 'Updated at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      visibleFrom: ['detail', 'list'],
    },
  },
  user: {
    id: {
      title: 'ID',
      type: 'number',
    },
    mrn: {
      title: 'Maritime Resource Name (MRN)',
      type: 'string',
      description: 'MCP MRN as unique identifer',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    firstName: {
      title: 'First name',
      type: 'string',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    lastName: {
      title: 'Last name',
      type: 'string',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    email: {
      title: 'e-mail',
      type: 'string',
      description: 'Contact e-mail',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    permissions: {
      title: 'Permissions',
      type: 'string',
      description: 'List of permissions assigned by the organization',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    mrnSubsidiary: {
      title: 'Subsidiary MRN',
      type: 'string',
      description: 'Additional MRN assigned to entity',
      visibleFrom: ['create', 'edit', 'detail'],
    },
    homeMMSUrl: {
      title: 'Home MMS URL',
      type: 'string',
      description: 'URL of home MMS',
      visibleFrom: ['create', 'edit', 'detail'],
    },
    createdAt: {
      title: 'Created at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      visibleFrom: ['detail'],
    },
    updatedAt: {
      title: 'Updated at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      visibleFrom: ['detail', 'list'],
    },
  },
  vessel: {
    id: {
      title: 'ID',
      type: 'number',
    },
    mrn: {
      title: 'Maritime Resource Name (MRN)',
      type: 'string',
      description: 'MCP MRN as unique identifer',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    name: {
      title: 'Name',
      type: 'string',
      description: 'Name of device',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
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
      visibleFrom: ['create', 'edit', 'detail'],
    },
    homeMMSUrl: {
      title: 'Home MMS URL',
      type: 'string',
      description: 'URL of home MMS',
      visibleFrom: ['create', 'edit', 'detail'],
    },
    // vessel specific
    imoNumber: {
      title: 'IMO number',
      type: 'string',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    mmsiNumber: {
      title: 'MMSI number',
      type: 'string',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    callsign: {
      title: 'Call sign',
      type: 'string',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    flagstate: {
      title: 'Flag state',
      type: 'string',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    aisClass: {
      title: 'AIS class',
      type: 'string',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    portOfRegister: {
      title: 'Port of register',
      type: 'string',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    createdAt: {
      title: 'Created at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      visibleFrom: ['detail'],
    },
    updatedAt: {
      title: 'Updated at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
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
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    roleName: {
      title: 'Role name',
      type: 'string',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    createdAt: {
      title: 'Created at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      visibleFrom: ['detail'],
    },
    updatedAt: {
      title: 'Updated at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      visibleFrom: ['detail', 'list'],
    },
  },
  approveorg: {
    id: {
      title: 'ID',
      type: 'number',
    },
    mrn: {
      title: 'Maritime Resource Name (MRN)',
      type: 'string',
      description: 'MCP MRN as unique identifer',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    name: {
      title: 'Name',
      type: 'string',
      description: 'Name of organization',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    mrnSubsidiary: {
      title: 'Subsidiary MRN',
      type: 'string',
      description: 'Additional MRN assigned to entity',
      visibleFrom: ['create', 'edit', 'detail'],
    },
    homeMMSUrl: {
      title: 'Home MMS URL',
      type: 'string',
      description: 'URL of home MMS',
      visibleFrom: ['create', 'edit', 'detail'],
    },
    email: {
      title: 'e-mail',
      type: 'string',
      description: 'Contact e-mail',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    url: {
      title: 'URL',
      type: 'string',
      description: 'URL of organization',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    address: {
      title: 'Address',
      type: 'string',
      description: 'Address of organization',
      visibleFrom: ['create', 'edit', 'detail'],
    },
    country: {
      title: 'Country',
      type: 'string',
      description: 'Country that organization belongs to',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    federationType: {
      title: 'Federation type',
      type: 'string',
      description: 'OpenID Connect federation type',
      visibleFrom: ['create', 'edit', 'detail'],
    },
    createdAt: {
      title: 'Created at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      visibleFrom: ['detail'],
    },
    updatedAt: {
      title: 'Updated at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
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
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    version: {
      title: 'Instance version',
      type: 'string',
      description: 'Version of service instance',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    serviceType: {
      title: 'Type',
      type: 'string',
      description: 'Type',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    status: {
      title: 'Status',
      type: 'string',
      visibleFrom: ['create', 'edit', 'detail'],
    },
    endpointUri: {
      title: 'Endpoint URI',
      type: 'string',
      visibleFrom: ['create', 'edit', 'detail'],
    },
    organizationId: {
      title: 'Organization',
      type: 'string',
      visibleFrom: ['create', 'edit', 'detail'],
    },
    keywords: {
      title: 'Keywords',
      type: 'string',
      visibleFrom: ['create', 'edit', 'detail'],
    },
    instanceId: {
      title: 'Instance ID',
      type: 'string',
      description: 'MCP MRN as unique identifer',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    createdAt: {
      title: 'Created at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      visibleFrom: ['detail'],
    },
    updatedAt: {
      title: 'Updated at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      visibleFrom: ['detail', 'list'],
    },
  },
  approvesvc: {
    id: {
      title: 'ID',
      type: 'number',
    },
    mrn: {
      title: 'Maritime Resource Name (MRN)',
      type: 'string',
      description: 'Unique identifier of service instance',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    name: {
      title: 'Name',
      type: 'string',
      description: 'Name of service instance',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    permissions: {
      title: 'Permissions',
      type: 'string',
      description: 'List of permissions assigned by the organization',
      visibleFrom: ['create', 'edit', 'detail'],
    },
    mrnSubsidiary: {
      title: 'Subsidiary MRN',
      type: 'string',
      description: 'Additional MRN assigned to entity',
      visibleFrom: ['create', 'edit', 'detail'],
    },
    homeMMSUrl: {
      title: 'Home MMS URL',
      type: 'string',
      description: 'URL of home MMS',
      visibleFrom: ['create', 'edit', 'detail'],
    },
    instanceVersion: {
      title: 'Instance version',
      type: 'string',
      description: 'Version of service instance',
      visibleFrom: ['create', 'edit', 'detail', 'list'],
    },
    oidcAccessType: {
      title: 'Access type',
      type: 'string',
      description: 'OpenID Connect access type',
      visibleFrom: ['create', 'edit', 'detail'],
    },
    oidcClientId: {
      title: 'OIDC client ID',
      type: 'string',
      description: 'OpenID Connect client ID',
      visibleFrom: ['create', 'edit', 'detail'],
    },
    vessel: {
      title: 'Vessel',
      type: 'string',
      description: 'Correlated vessel',
      visibleFrom: ['create', 'edit', 'detail'],
    },
    createdAt: {
      title: 'Created at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      visibleFrom: ['detail'],
    },
    updatedAt: {
      title: 'Updated at',
      type: 'string',
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      visibleFrom: ['detail', 'list'],
    },
  },
};
