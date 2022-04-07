export const MenuType = ['device', 'vessel', 'user', 'service', 'organization', 'role', 'agent', 'instance', 'approveorg', 'approvesvc'];

export const EntityTypes = ['device', 'vessel', 'user', 'service', 'organization', 'mms'];

export enum EntityType {
  Device = 'device',
  Organization = 'organization',
  Service = 'service',
  User = 'user',
  Vessel = 'vessel',
  MMS = 'mms'
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
  unapprovedorg: 'approveorg',
  approveorg: 'unapproved organization',
  approvesvc: 'unapproved service',
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
  approveorg: 'clipboard',
  approvesvc: 'clipboard',
}