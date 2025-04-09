import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import request from 'supertest';

import { AuthToken } from '@/domain/entities';
import { app } from '@/main/config/app';
import { env } from '@/main/config/env';
import { Permissions } from '@/main/enums';

import { clearAllTables, createRole, createUsers } from '@/tests/helpers';
import { authorizationTokenMock } from '@/tests/mocks/infra';

describe('Gym Routes', () => {
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  afterEach(async () => {
    await clearAllTables(prisma);
  });

  describe('POST /gym', () => {
    const requestData = {
      name: 'Baroque Workout',
      email: 'baroque_workout@mail.com',
      contact: 'baroque_workout@mail.com',
      address: {
        city: 'Alubarna',
        neighborhood: 'Imperial Garden',
        number: '253',
        postalCode: '04674-070',
        state: 'AB',
        street: 'Palace Street',
      },
    };

    it('Should return 401 if request does not contain token', async () => {
      await request(app).post('/api/gym').send(requestData).expect(401);
    });

    it('Should return 403 if authorization token does not contain required permission', async () => {
      const authorizationToken = authorizationTokenMock('invalid_permission');

      await request(app).post('/api/gym').set('authorization', authorizationToken).send(requestData).expect(403);
    });

    it('Should return 204 on success', async () => {
      await createRole(prisma);

      await createUsers(prisma, [
        { name: 'Crocodile', email: 'crocodile_mr0@mail.com' },
        { name: 'Daz Bonez', email: 'mister_1@mail.com' },
        { name: 'Bon Clay', email: 'mister_2@mail.com' },
      ]);

      const authorizationToken = authorizationTokenMock(Permissions.CREATE_GYM);

      await request(app)
        .post('/api/gym')
        .set('authorization', authorizationToken)
        .send({ administrators: ['mister_1@mail.com', 'mister_2@mail.com'], ...requestData })
        .expect(204);
    });
  });

  describe('PUT /gym/:gymId/assign', () => {
    const requestData = {
      gymId: 'valid_gym_id',
      usersEmails: ['nami_cat_buglar@mail.com', 'tony_chopper_tony@mail.com'],
      usersType: 'clients',
    };

    it('Should return 404 if gymID does not exist', async () => {
      await createRole(prisma);
      await createUsers(prisma, [{ email: 'nami_cat_buglar@mail.com' }, { email: 'tony_chopper_tony@mail.com' }]);

      const authorizationToken = authorizationTokenMock(Permissions.ASSiGN_USER_TO_GYM);

      await request(app)
        .put('/api/gym/invalid_id/assign')
        .set('authorization', authorizationToken)
        .send(requestData)
        .expect(404);
    });

    it('Should return 204 on success', async () => {
      await createRole(prisma);
      await createUsers(prisma, [{ email: 'nami_cat_buglar@mail.com' }, { email: 'tony_chopper_tony@mail.com' }]);

      await prisma.gym.create({
        data: {
          id: 'any_id',
          name: 'Iron Blue',
          contact: 'iron_blue@mail.com',
        },
      });

      const authorizationToken = authorizationTokenMock(Permissions.ASSiGN_USER_TO_GYM);

      await request(app)
        .put('/api/gym/any_id/assign')
        .set('authorization', authorizationToken)
        .send(requestData)
        .expect(204);
    });
  });

  describe('GET /gym/:gymId/exercises', () => {
    it('Should return 204 on invalid gym id', async () => {
      await request(app).get('/api/gym/invalid_gym_id/exercises').expect(204);
    });
  });
});
