import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import request from 'supertest';

import { AuthToken } from '@/domain/entities';
import { app } from '@/main/config/app';
import { env } from '@/main/config/env';
import { Permissions } from '@/main/enums';

import { clearAllTables, createRole, createUsers } from '@/tests/helpers';

describe('Gym Routes', () => {
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  afterEach(async () => {
    clearAllTables(prisma);
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
      const authorizationToken = sign(
        { id: 'any_user_id', role: 'any_role_name', permissions: ['invalid_permission'] },
        env.secret,
        { expiresIn: AuthToken.expirationInMs / 1000 },
      );

      await request(app).post('/api/gym').set('authorization', authorizationToken).send(requestData).expect(403);
    });

    it('Should return 204 on success', async () => {
      await createRole(prisma, 'admin');

      await createUsers(prisma, [
        { name: 'Crocodile', email: 'crocodile_mr0@mail.com' },
        { name: 'Daz Bonez', email: 'mister_1@mail.com' },
        { name: 'Bon Clay', email: 'mister_2@mail.com' },
      ]);

      const authorizationToken = sign(
        { id: 'any_user_id', role: 'any_role_name', permissions: [Permissions.CREATE_GYM] },
        env.secret,
        { expiresIn: AuthToken.expirationInMs / 1000 },
      );

      await request(app)
        .post('/api/gym')
        .set('authorization', authorizationToken)
        .send({ administrators: ['mister_1@mail.com', 'mister_2@mail.com'], ...requestData })
        .expect(204);
    });
  });
});
