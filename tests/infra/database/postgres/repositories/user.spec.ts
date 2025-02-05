import { PrismaClient } from '@prisma/client';

import { UserRepository } from '@/infra/database/postgres/repositories';

import { clearAllTables, createRole } from '@/tests/mocks/infra';

describe('UserRepository', () => {
  let prisma: PrismaClient;
  let sut: UserRepository;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  beforeEach(() => {
    sut = new UserRepository();
  });

  afterEach(async () => {
    await clearAllTables(prisma);
  });

  describe('load', () => {
    it('Should return null if email does not exist', async () => {
      const user = await sut.load({ email: 'any_email@mail.com' });

      expect(user).toBeNull();
    });

    it('Should return an User if email exists', async () => {
      await createRole(prisma);
      await prisma.user.create({
        data: {
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password',
          role: 'any_role_name',
          contact: 'any_contact',
        },
      });

      const user = await sut.load({ email: 'any_email@mail.com' });

      expect(user?.id).toBeTruthy();
      expect(user?.name).toBe('any_name');
      expect(user?.email).toBe('any_email@mail.com');
      expect(user?.password).toBe('any_password');
      expect(user?.role).toBe('any_role_name');
      expect(user?.contact).toBe('any_contact');
      expect(user?.address).toBeUndefined();
    });
  });

  describe('save', () => {
    it('Should return an User if email exists', async () => {
      await createRole(prisma);

      await sut.save({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        role: 'any_role_name',
        contact: 'any_contact',
        address: {
          city: 'any_city',
          complement: 'any_complement',
          neighborhood: 'any_neighborhood',
          number: 'any_number',
          postalCode: 'any_postalCode',
          state: 'st',
          street: 'any_street',
        },
      });
      const user = await prisma.user.findUnique({ where: { email: 'any_email@mail.com' }, include: { address: true } });

      expect(user?.id).toBeTruthy();
      expect(user?.name).toBe('any_name');
      expect(user?.email).toBe('any_email@mail.com');
      expect(user?.password).toBe('any_password');
      expect(user?.role).toBe('any_role_name');
      expect(user?.contact).toBe('any_contact');
      // expect(user?.address).toEqual({
      //   city: 'any_city',
      //   complement: 'any_complement',
      //   neighborhood: 'any_neighborhood',
      //   number: 'any_number',
      //   postalCode: 'any_postalCode',
      //   state: 'st',
      //   street: 'any_street',
      // });
    });
  });
});
