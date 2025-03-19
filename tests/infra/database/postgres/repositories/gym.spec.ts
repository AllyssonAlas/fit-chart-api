import { PrismaClient } from '@prisma/client';

import { GymRepository } from '@/infra/database/postgres/repositories';

describe('GymRepository', () => {
  let prisma: PrismaClient;
  let sut: GymRepository;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  beforeEach(() => {
    sut = new GymRepository();
  });

  afterEach(async () => {
    await prisma.gym.deleteMany({});
  });

  describe('save', () => {
    it('Should save a Gym', async () => {
      await sut.save({
        name: 'any_name',
        email: 'any_email@mail.com',
        administrators: [],
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

      const gym = await prisma.gym.findFirst({
        where: { email: 'any_email@mail.com' },
        include: { address: true, administrators: true },
      });

      expect(gym?.id).toBeTruthy();
      expect(gym?.name).toBe('any_name');
      expect(gym?.email).toBe('any_email@mail.com');
      expect(gym?.administrators).toEqual([]);
      expect(gym?.contact).toBe('any_contact');
      expect(gym?.address?.city).toBe('any_city');
      expect(gym?.address?.complement).toBe('any_complement');
      expect(gym?.address?.neighborhood).toBe('any_neighborhood');
      expect(gym?.address?.number).toBe('any_number');
      expect(gym?.address?.postalCode).toBe('any_postalCode');
      expect(gym?.address?.state).toBe('st');
      expect(gym?.address?.street).toBe('any_street');
    });
  });

  describe('load', () => {
    it('Should return undefined if id does not exist', async () => {
      const gym = await sut.load({ id: 'any_gym_id' });

      expect(gym).toBeNull();
    });
  });
});
