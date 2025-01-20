import { RoleRepository } from '@/infra/database/postgres/repositories';

describe('RoleRepository', () => {
  let sut: RoleRepository;

  beforeEach(() => {
    sut = new RoleRepository();
  });

  describe('load', () => {
    it('Should return null if name does not exists', async () => {
      const role = await sut.load({ name: 'any_role_name' });

      expect(role).toBeNull();
    });
  });
});
