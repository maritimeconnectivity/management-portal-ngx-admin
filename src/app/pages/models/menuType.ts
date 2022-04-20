export const EntityTypes = ['device', 'vessel', 'user', 'service', 'organization', 'mms'];

export enum EntityType {
  Device = 'device',
  Organization = 'organization',
  Service = 'service',
  User = 'user',
  Vessel = 'vessel',
  MMS = 'mms'
}

export enum MenuType {
  Device = 'device',
  Organization = 'organization',
  Service = 'service',
  User = 'user',
  Vessel = 'vessel',
  MMS = 'mms',
  Role = 'role',
  Agent = 'agent',
  Instance = 'instance',
  InstanceOfOrg = 'instanceorg',
  UnapprovedOrg = 'approveorg',
  UnapprovedSvc = 'approvesvc',
}

export const ResourceType = ['device', 'vessel', 'user', 'service', 'role', 'agent'];

export const MenuTypeNames = {
  vessel: 'vessel',
  device: 'device',
  user: 'user',
  organization: 'organization',
  service: 'service',
  role: 'role',
  agent: 'agent',
  mms: 'mms',
  instance: 'instance',
  instanceorg: 'instance',
  approveorg: 'unapproved organization',
  approvesvc: 'unapproved service',
  orgsvc: 'owned service',
}

export const MenuTypeIconNames = {
  vessel: 'ship',
  device: 'hdd',
  user: 'user',
  organization: 'flag',
  service: 'cog',
  role: 'id-badge',
  agent: 'user',
  mms: 'forward',
  instance: 'compass',
  instanceorg: 'compass',
  approveorg: 'clipboard',
  approvesvc: 'clipboard',
}