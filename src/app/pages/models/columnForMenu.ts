import { convertTime } from "../../util/timeConverter";

export const ColumnForMenu = {
    device: {
        id: {
            title: 'ID',
            type: 'number',
          },
          mrn: {
            title: 'Maritime Resource Name (MRN)',
            type: 'string',
            visibleFrom: ['create', 'edit', 'detail', 'list'],
          },
          name: {
            title: 'Name',
            type: 'string',
            visibleFrom: ['create', 'edit', 'detail', 'list'],
          },
          permissions: {
            title: 'Permissions',
            type: 'string',
            visibleFrom: ['edit', 'detail'],
          },
          mrnSubsidiary: {
            title: 'Subsidiary MRN',
            type: 'string',
            visibleFrom: ['create', 'edit', 'detail'],
          },
          homeMMSUrl: {
            title: 'Home MMS URL',
            type: 'string',
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
            visibleFrom: ['create', 'edit', 'detail', 'list'],
          },
          name: {
            title: 'Name',
            type: 'string',
            visibleFrom: ['create', 'edit', 'detail', 'list'],
          },
          mrnSubsidiary: {
            title: 'Subsidiary MRN',
            type: 'string',
            visibleFrom: ['create', 'edit', 'detail'],
          },
          homeMMSUrl: {
            title: 'Home MMS URL',
            type: 'string',
            visibleFrom: ['create', 'edit', 'detail'],
          },
          email: {
            title: 'e-mail',
            type: 'string',
            visibleFrom: ['create', 'edit', 'detail', 'list'],
          },
          url: {
            title: 'URL',
            type: 'string',
            visibleFrom: ['create', 'edit', 'detail', 'list'],
          },
          address: {
            title: 'Address',
            type: 'string',
            visibleFrom: ['create', 'edit', 'detail'],
          },
          country: {
            title: 'Country',
            type: 'string',
            visibleFrom: ['create', 'edit', 'detail', 'list'],
          },
          federationType: {
            title: 'Federation type',
            type: 'string',
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
            visibleFrom: ['create', 'edit', 'detail', 'list'],
          },
          name: {
            title: 'Name',
            type: 'string',
            visibleFrom: ['create', 'edit', 'detail', 'list'],
          },
          permissions: {
            title: 'Permissions',
            type: 'string',
            visibleFrom: ['create', 'edit', 'detail'],
          },
          mrnSubsidiary: {
            title: 'Subsidiary MRN',
            type: 'string',
            visibleFrom: ['create', 'edit', 'detail'],
          },
          homeMMSUrl: {
            title: 'Home MMS URL',
            type: 'string',
            visibleFrom: ['create', 'edit', 'detail'],
          },
          instanceVersion: {
            title: 'Instance version',
            type: 'string',
            visibleFrom: ['create', 'edit', 'detail', 'list'],
          },
          oidcAccessType: {
            title: 'Access type',
            type: 'string',
            visibleFrom: ['create', 'edit', 'detail'],
          },
          oidcClientId: {
            title: 'OIDC client ID',
            type: 'string',
            visibleFrom: ['create', 'edit', 'detail'],
          },
          vessel: {
            title: 'Vessel',
            type: 'string',
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
            visibleFrom: ['create', 'edit', 'detail', 'list'],
          },
          permissions: {
            title: 'Permissions',
            type: 'string',
            visibleFrom: ['create', 'edit', 'detail', 'list'],
          },
          mrnSubsidiary: {
            title: 'Subsidiary MRN',
            type: 'string',
            visibleFrom: ['create', 'edit', 'detail'],
          },
          homeMMSUrl: {
            title: 'Home MMS URL',
            type: 'string',
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
            visibleFrom: ['create', 'edit', 'detail', 'list'],
          },
          name: {
            title: 'Name',
            type: 'string',
            visibleFrom: ['create', 'edit', 'detail', 'list'],
          },
          permissions: {
            title: 'Permissions',
            type: 'string',
            visibleFrom: ['create', 'edit', 'detail'],
          },
          mrnSubsidiary: {
            title: 'Subsidiary MRN',
            type: 'string',
            visibleFrom: ['create', 'edit', 'detail'],
          },
          homeMMSUrl: {
            title: 'Home MMS URL',
            type: 'string',
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
        visibleFrom: ['create', 'edit', 'detail', 'list'],
      },
      name: {
        title: 'Name',
        type: 'string',
        visibleFrom: ['create', 'edit', 'detail', 'list'],
      },
      mrnSubsidiary: {
        title: 'Subsidiary MRN',
        type: 'string',
        visibleFrom: ['create', 'edit', 'detail'],
      },
      homeMMSUrl: {
        title: 'Home MMS URL',
        type: 'string',
        visibleFrom: ['create', 'edit', 'detail'],
      },
      email: {
        title: 'e-mail',
        type: 'string',
        visibleFrom: ['create', 'edit', 'detail', 'list'],
      },
      url: {
        title: 'URL',
        type: 'string',
        visibleFrom: ['create', 'edit', 'detail', 'list'],
      },
      address: {
        title: 'Address',
        type: 'string',
        visibleFrom: ['create', 'edit', 'detail'],
      },
      country: {
        title: 'Country',
        type: 'string',
        visibleFrom: ['create', 'edit', 'detail', 'list'],
      },
      federationType: {
        title: 'Federation type',
        type: 'string',
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
      mrn: {
        title: 'Maritime Resource Name (MRN)',
        type: 'string',
        visibleFrom: ['create', 'edit', 'detail', 'list'],
      },
      name: {
        title: 'Name',
        type: 'string',
        visibleFrom: ['create', 'edit', 'detail', 'list'],
      },
      permissions: {
        title: 'Permissions',
        type: 'string',
        visibleFrom: ['create', 'edit', 'detail'],
      },
      mrnSubsidiary: {
        title: 'Subsidiary MRN',
        type: 'string',
        visibleFrom: ['create', 'edit', 'detail'],
      },
      homeMMSUrl: {
        title: 'Home MMS URL',
        type: 'string',
        visibleFrom: ['create', 'edit', 'detail'],
      },
      instanceVersion: {
        title: 'Instance version',
        type: 'string',
        visibleFrom: ['create', 'edit', 'detail', 'list'],
      },
      oidcAccessType: {
        title: 'Access type',
        type: 'string',
        visibleFrom: ['create', 'edit', 'detail'],
      },
      oidcClientId: {
        title: 'OIDC client ID',
        type: 'string',
        visibleFrom: ['create', 'edit', 'detail'],
      },
      vessel: {
        title: 'Vessel',
        type: 'string',
        visibleFrom: ['create', 'edit', 'detail'],
      },
      registerToLedger: {
        title: 'Register to ledger',
        type: 'boolean',
        visibleFrom: ['create', 'edit'],
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
        visibleFrom: ['create', 'edit', 'detail', 'list'],
      },
      name: {
        title: 'Name',
        type: 'string',
        visibleFrom: ['create', 'edit', 'detail', 'list'],
      },
      permissions: {
        title: 'Permissions',
        type: 'string',
        visibleFrom: ['create', 'edit', 'detail'],
      },
      mrnSubsidiary: {
        title: 'Subsidiary MRN',
        type: 'string',
        visibleFrom: ['create', 'edit', 'detail'],
      },
      homeMMSUrl: {
        title: 'Home MMS URL',
        type: 'string',
        visibleFrom: ['create', 'edit', 'detail'],
      },
      instanceVersion: {
        title: 'Instance version',
        type: 'string',
        visibleFrom: ['create', 'edit', 'detail', 'list'],
      },
      oidcAccessType: {
        title: 'Access type',
        type: 'string',
        visibleFrom: ['create', 'edit', 'detail'],
      },
      oidcClientId: {
        title: 'OIDC client ID',
        type: 'string',
        visibleFrom: ['create', 'edit', 'detail'],
      },
      vessel: {
        title: 'Vessel',
        type: 'string',
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
}