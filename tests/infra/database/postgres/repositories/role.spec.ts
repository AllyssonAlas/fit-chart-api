import { PrismaClient } from '@prisma/client';

import { RoleRepository } from '@/infra/database/postgres/repositories';

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
    await prisma.role.deleteMany({});
    await prisma.permission.deleteMany({});
  });

  describe('load', () => {
    it('Should return null if name does not exists', async () => {
      const role = await sut.load({ name: 'any_role_name' });

      expect(role).toBeNull();
    });

    it('Should return a Role if name exists', async () => {
      await prisma.role.create({
        data: {
          name: 'any_role_name',
          permissions: {
            create: [{ name: 'permission_1' }, { name: 'permission_2' }, { name: 'permission_3' }],
          },
        },
      });

      const role = await sut.load({ name: 'any_role_name' });

      expect(role?.id).toBeTruthy();
      expect(role?.name).toBe('any_role_name');
      expect(role?.permissions).toEqual(['permission_1', 'permission_2', 'permission_3']);
    });
  });
});
