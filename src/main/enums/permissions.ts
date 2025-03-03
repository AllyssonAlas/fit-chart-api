import { Roles } from './roles';

export enum Permissions {
  CREATE_GYM = 'create-gym',
}

type PermissionList = {
  name: Permissions;
  roles: Roles[];
}[];

export const permissionsList: PermissionList = [{ name: Permissions.CREATE_GYM, roles: [Roles.ADMIN] }];
