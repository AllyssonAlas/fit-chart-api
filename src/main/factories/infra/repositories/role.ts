import { RoleRepository } from '@/infra/database/postgres/repositories';

export const makeRoleRepository = (): RoleRepository => {
  return new RoleRepository();
};
