import { PrismaClient } from '@prisma/client';

import { RoleRepository } from '@/infra/database/postgres/repositories';

import { clearRoleTable, createRole } from '@/tests/helpers';

describe('RoleRepository', () => {
  let prisma: PrismaClient;
  let sut: RoleRepository;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  beforeEach(() => {
    sut = new RoleRepository();
  });

  afterEach(async () => {
    await clearRoleTable(prisma);
  });

  describe('load', () => {
    it('Should return null if name does not exists', async () => {
      const role = await sut.load({ name: 'any_role_name' });

      expect(role).toBeNull();
    });

    it('Should return a Role if name exists', async () => {
      await createRole(prisma);

      const role = await sut.load({ name: 'any_role_name' });

      expect(role?.id).toBeTruthy();
      expect(role?.name).toBe('any_role_name');
      expect(role?.permissions).toEqual(['permission_1', 'permission_2']);
    });
  });
});
