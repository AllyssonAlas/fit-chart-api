import { Roles } from './roles';

export enum Permissions {
  CREATE_GYM = 'create-gym',
  ASSiGN_USER_TO_GYM = 'assign-user-to-gym',
  CREATE_EXERCISES_CHART = 'create-exercises-chart',
  LIST_USER_EXERCISES_CHARTS = 'create-user-exercises-charts',
  LOAD_USER_ACTIVE_EXERCISES_CHART = 'load-user-active-exercises-chart',
}

type PermissionList = {
  name: Permissions;
  roles: Roles[];
}[];

export const permissionsList: PermissionList = [
  { name: Permissions.CREATE_GYM, roles: [Roles.ADMIN] },
  { name: Permissions.ASSiGN_USER_TO_GYM, roles: [Roles.ADMIN] },
  { name: Permissions.CREATE_EXERCISES_CHART, roles: [Roles.ADMIN, Roles.USER] },
  { name: Permissions.LIST_USER_EXERCISES_CHARTS, roles: [Roles.ADMIN, Roles.USER] },
  { name: Permissions.LOAD_USER_ACTIVE_EXERCISES_CHART, roles: [Roles.ADMIN, Roles.USER] },
];
