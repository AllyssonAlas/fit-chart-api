import { PrismaClient } from '@prisma/client';

import { UserRepository } from '@/infra/database/postgres/repositories';

describe('UserRepository', () => {
  let sut: UserRepository;

  beforeEach(() => {
    sut = new UserRepository();
  });

  describe('load', () => {
    it('Should return null if email does not exist', async () => {
      const user = await sut.load({ email: 'any_email@mail.com' });

      expect(user).toBeNull();
    });
  });
});
