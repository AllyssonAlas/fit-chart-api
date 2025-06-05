import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import request from 'supertest';

import { app } from '@/main/config/app';
import { env } from '@/main/config/env';
import { Permissions } from '@/main/enums';

import { clearAllTables, createExercises, createExercisesChart, createRole, createUsers } from '@/tests/helpers';
import { authorizationTokenMock } from '@/tests/mocks/infra';

describe('User Routes', () => {
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  afterEach(async () => {
    await clearAllTables(prisma);
  });

  describe('POST /user', () => {
    const requestData = {
      name: 'Roronoa Zoro',
      email: 'roronoa_z@mail.com',
      password: 'waDO_Ich!m0nj1',
      role: 'client',
      contact: 'straw_pirates.com/zoro',
      address: {
        city: 'Shimotsuki Village',
        neighborhood: 'None',
        number: 'XXX',
        postalCode: '04674-070',
        state: 'EB',
        street: 'Isshin Dojo street',
      },
    };

    it('Should return 403 if role does not exist', async () => {
      await request(app).post('/api/user').send(requestData).expect(403);
    });

    it('Should return 200 on success', async () => {
      await createRole(prisma, 'client');

      await request(app).post('/api/user').send(requestData).expect(200);
    });
  });

  describe('POST /login', () => {
    it('Should return 401 if credentials are invalid', async () => {
      await request(app)
        .post('/api/login')
        .send({ email: 'nami_the_cat_buglar@mail.com', password: 'tr34$ur3s' })
        .expect(401);
    });

    it('Should return 200 on success', async () => {
      await createRole(prisma, 'client');
      const password = await hash('c4Pt4!n', env.salt);
      const email = 'captain_usopp@mail.com';

      await createUsers(prisma, [{ email, password, role: 'client' }]);

      await request(app).post('/api/login').send({ email, password: 'c4Pt4!n' }).expect(200);
    });
  });

  describe('POST /user/:userId/exercisesChart', () => {
    it('Should return 204 on success', async () => {
      await createRole(prisma, 'client');
      await createUsers(prisma, [{ id: 'some_valid_id', role: 'client' }]);
      await createExercises(prisma, 'costa', [
        { id: 'exercise_id_1', name: 'Supino Reto', equipment: 'barra', availableAt: [] },
        { id: 'exercise_id_2', name: 'Supino Inclinado', equipment: '', availableAt: [] },
      ]);

      const authorizationToken = authorizationTokenMock(Permissions.CREATE_EXERCISES_CHART, 'some_valid_id');

      await request(app)
        .post('/api/user/some_valid_id/exercisesChart')
        .set('authorization', authorizationToken)
        .send({
          goals: 'Hipertrofia Muscular',
          divisions: [
            { name: 'A', weekDays: [0, 2] },
            { name: 'B', weekDays: [1, 3] },
          ],
          exercises: [
            { exerciseId: 'exercise_id_1', series: 4, repts: 12, weight: 20, division: 'A' },
            { exerciseId: 'exercise_id_2', series: 3, repts: 10, weight: 30, division: 'B' },
          ],
        })
        .expect(204);
    });
  });

  describe('POST /user/:userId/exercisesChart', () => {
    it('Should return 204 if user does not have exercises charts', async () => {
      await createRole(prisma, 'user');
      await createUsers(prisma, [{ id: 'some_valid_id', role: 'user' }]);

      const authorizationToken = authorizationTokenMock(Permissions.LIST_USER_EXERCISES_CHARTS, 'some_valid_id');

      await request(app)
        .get('/api/user/some_valid_id/exercisesChart')
        .set('authorization', authorizationToken)
        .expect(204);
    });

    it('Should return 200 on success', async () => {
      await createRole(prisma, 'user');
      await createUsers(prisma, [{ id: 'some_valid_id', role: 'user' }]);

      const authorizationToken = authorizationTokenMock(Permissions.LIST_USER_EXERCISES_CHARTS, 'some_valid_id');

      await createExercises(prisma, 'Peito', [
        { id: 'any_exercise_id_1', name: 'Supino reto', equipment: 'barra', availableAt: [] },
        { id: 'any_exercise_id_2', name: 'Supino inclinado', availableAt: [] },
      ]);

      await createExercisesChart(prisma, [
        {
          userId: 'some_valid_id',
          goals: 'Hipertrofia',
          observation: 'any_observation',
          divisions: [
            { name: 'A', weekDays: [0, 2, 4] },
            { name: 'B', weekDays: [1, 3, 5] },
          ],
          exercises: [
            { exerciseId: 'any_exercise_id_1', series: 4, repts: 12, weight: 20, division: 'A' },
            { exerciseId: 'any_exercise_id_2', series: 3, repts: 10, weight: 30, division: 'B' },
          ],
        },
      ]);

      await request(app)
        .get('/api/user/some_valid_id/exercisesChart')
        .set('authorization', authorizationToken)
        .expect(200);
    });
  });
});
