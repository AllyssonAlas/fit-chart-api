import { Roles } from './roles';

export enum Permissions {
  CREATE_GYM = 'create-gym',
  ASSiGN_USER_TO_GYM = 'assign-user-to-gym',
  CREATE_EXERCISES_CHART = 'create-exercises-chart',
}

type PermissionList = {
  name: Permissions;
  roles: Roles[];
}[];

export const permissionsList: PermissionList = [
  { name: Permissions.CREATE_GYM, roles: [Roles.ADMIN] },
  { name: Permissions.ASSiGN_USER_TO_GYM, roles: [Roles.ADMIN] },
  { name: Permissions.ASSiGN_USER_TO_GYM, roles: [Roles.ADMIN] },
  { name: Permissions.CREATE_EXERCISES_CHART, roles: [Roles.ADMIN, Roles.USER] },
];
