import { convertTime } from "../../util/timeConverter";

export const ColumnForMenu = {
  device: {
    id: {
      title: "ID",
      type: "number",
      description: "identifier",
    },
    mrn: {
      title: "Maritime Resource Name (MRN)",
      type: "string",
      description: "ID of device",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    name: {
      title: "Name",
      type: "string",
      description: "Name of device",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    permissions: {
      title: "Permissions",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["edit", "detail"],
    },
    mrnSubsidiary: {
      title: "Subsidiary MRN",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    homeMMSUrl: {
      title: "Home MMS URL",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    createdAt: {
      title: "Created at",
      type: "string",
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      description: "Please describe something!!!!",
      visibleFrom: ["detail"],
    },
    updatedAt: {
      title: "Updated at",
      type: "string",
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      description: "Please describe something!!!!",
      visibleFrom: ["detail", "list"],
    },
  },
  organization: {
    id: {
      title: "ID",
      type: "number",
    },
    mrn: {
      title: "Maritime Resource Name (MRN)",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    name: {
      title: "Name",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    mrnSubsidiary: {
      title: "Subsidiary MRN",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    homeMMSUrl: {
      title: "Home MMS URL",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    email: {
      title: "e-mail",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    url: {
      title: "URL",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    address: {
      title: "Address",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    country: {
      title: "Country",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    federationType: {
      title: "Federation type",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    createdAt: {
      title: "Created at",
      type: "string",
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      description: "Please describe something!!!!",
      visibleFrom: ["detail"],
    },
    updatedAt: {
      title: "Updated at",
      type: "string",
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      description: "Please describe something!!!!",
      visibleFrom: ["detail", "list"],
    },
  },
  service: {
    id: {
      title: "ID",
      type: "number",
    },
    mrn: {
      title: "Maritime Resource Name (MRN)",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    name: {
      title: "Name",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    permissions: {
      title: "Permissions",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    mrnSubsidiary: {
      title: "Subsidiary MRN",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    homeMMSUrl: {
      title: "Home MMS URL",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    instanceVersion: {
      title: "Instance version",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    oidcAccessType: {
      title: "Access type",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    oidcClientId: {
      title: "OIDC client ID",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    vessel: {
      title: "Vessel",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    createdAt: {
      title: "Created at",
      type: "string",
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      description: "Please describe something!!!!",
      visibleFrom: ["detail"],
    },
    updatedAt: {
      title: "Updated at",
      type: "string",
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      description: "Please describe something!!!!",
      visibleFrom: ["detail", "list"],
    },
  },
  user: {
    id: {
      title: "ID",
      type: "number",
    },
    mrn: {
      title: "Maritime Resource Name (MRN)",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    firstName: {
      title: "First name",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    lastName: {
      title: "Last name",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    email: {
      title: "e-mail",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    permissions: {
      title: "Permissions",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    mrnSubsidiary: {
      title: "Subsidiary MRN",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    homeMMSUrl: {
      title: "Home MMS URL",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    createdAt: {
      title: "Created at",
      type: "string",
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      description: "Please describe something!!!!",
      visibleFrom: ["detail"],
    },
    updatedAt: {
      title: "Updated at",
      type: "string",
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      description: "Please describe something!!!!",
      visibleFrom: ["detail", "list"],
    },
  },
  vessel: {
    id: {
      title: "ID",
      type: "number",
    },
    mrn: {
      title: "Maritime Resource Name (MRN)",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    name: {
      title: "Name",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    permissions: {
      title: "Permissions",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    mrnSubsidiary: {
      title: "Subsidiary MRN",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    homeMMSUrl: {
      title: "Home MMS URL",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    // vessel specific
    imoNumber: {
      title: "IMO number",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    mmsiNumber: {
      title: "MMSI number",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    callsign: {
      title: "Call sign",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    flagstate: {
      title: "Flag state",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    aisClass: {
      title: "AIS class",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    portOfRegister: {
      title: "Port of register",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    createdAt: {
      title: "Created at",
      type: "string",
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      description: "Please describe something!!!!",
      visibleFrom: ["detail"],
    },
    updatedAt: {
      title: "Updated at",
      type: "string",
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      description: "Please describe something!!!!",
      visibleFrom: ["detail", "list"],
    },
  },
  role: {
    id: {
      title: "ID",
      type: "number",
    },
    permission: {
      title: "Permission",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    roleName: {
      title: "Role name",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    createdAt: {
      title: "Created at",
      type: "string",
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      description: "Please describe something!!!!",
      visibleFrom: ["detail"],
    },
    updatedAt: {
      title: "Updated at",
      type: "string",
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      description: "Please describe something!!!!",
      visibleFrom: ["detail", "list"],
    },
  },
  approveorg: {
    id: {
      title: "ID",
      type: "number",
    },
    mrn: {
      title: "Maritime Resource Name (MRN)",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    name: {
      title: "Name",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    mrnSubsidiary: {
      title: "Subsidiary MRN",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    homeMMSUrl: {
      title: "Home MMS URL",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    email: {
      title: "e-mail",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    url: {
      title: "URL",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    address: {
      title: "Address",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    country: {
      title: "Country",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    federationType: {
      title: "Federation type",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    createdAt: {
      title: "Created at",
      type: "string",
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      description: "Please describe something!!!!",
      visibleFrom: ["detail"],
    },
    updatedAt: {
      title: "Updated at",
      type: "string",
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      description: "Please describe something!!!!",
      visibleFrom: ["detail", "list"],
    },
  },
  instance: {
    id: {
      title: "ID",
      type: "number",
    },
    mrn: {
      title: "Maritime Resource Name (MRN)",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    name: {
      title: "Name",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    permissions: {
      title: "Permissions",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    mrnSubsidiary: {
      title: "Subsidiary MRN",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    homeMMSUrl: {
      title: "Home MMS URL",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    instanceVersion: {
      title: "Instance version",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    oidcAccessType: {
      title: "Access type",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    oidcClientId: {
      title: "OIDC client ID",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    vessel: {
      title: "Vessel",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    registerToLedger: {
      title: "Register to ledger",
      type: "boolean",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit"],
    },
    createdAt: {
      title: "Created at",
      type: "string",
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      description: "Please describe something!!!!",
      visibleFrom: ["detail"],
    },
    updatedAt: {
      title: "Updated at",
      type: "string",
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      description: "Please describe something!!!!",
      visibleFrom: ["detail", "list"],
    },
  },
  approvesvc: {
    id: {
      title: "ID",
      type: "number",
    },
    mrn: {
      title: "Maritime Resource Name (MRN)",
      type: "string",
      description: "Unique identifier of service instance",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    name: {
      title: "Name",
      type: "string",
      description: "Name of service instance",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    permissions: {
      title: "Permissions",
      type: "string",
      description: "Permission",
      visibleFrom: ["create", "edit", "detail"],
    },
    mrnSubsidiary: {
      title: "Subsidiary MRN",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    homeMMSUrl: {
      title: "Home MMS URL",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    instanceVersion: {
      title: "Instance version",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail", "list"],
    },
    oidcAccessType: {
      title: "Access type",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    oidcClientId: {
      title: "OIDC client ID",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    vessel: {
      title: "Vessel",
      type: "string",
      description: "Please describe something!!!!",
      visibleFrom: ["create", "edit", "detail"],
    },
    createdAt: {
      title: "Created at",
      type: "string",
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      description: "Please describe something!!!!",
      visibleFrom: ["detail"],
    },
    updatedAt: {
      title: "Updated at",
      type: "string",
      filter: false,
      valuePrepareFunction: (timestamp: any) => {
        return convertTime(timestamp);
      },
      description: "Please describe something!!!!",
      visibleFrom: ["detail", "list"],
    },
  },
};
