import { sign } from 'jsonwebtoken';
import request from 'supertest';

import { AuthToken } from '@/domain/entities';
import { app } from '@/main/config/app';
import { env } from '@/main/config/env';
import { Permissions } from '@/main/enums';

describe('Gym Routes', () => {
  describe('POST /gym', () => {
    it('Should return 401 if request does not contain token', async () => {
      await request(app)
        .post('/api/gym')
        .send({
          name: 'Baroque Workout',
          email: 'baroque_workout@mail.com',
          contact: 'baroque_workout@mail.com',
          ownerEmail: 'crocodile_mr0@mail.com',
          address: {
            city: 'São Paulo',
            neighborhood: 'Jardim Itapeva',
            number: '08',
            postalCode: '04674-070',
            state: 'SP',
            street: 'Rua General Antônio Tavares da Motta',
          },
        })
        .expect(401);
    });

    it('Should return 403 if authorization token does not contain required permission', async () => {
      const authorizationToken = sign(
        { id: 'any_user_id', role: 'any_role_name', permissions: ['invalid_permission'] },
        env.secret,
        { expiresIn: AuthToken.expirationInMs / 1000 },
      );

      await request(app)
        .post('/api/gym')
        .set('authorization', authorizationToken)
        .send({
          name: 'Baroque Workout',
          email: 'baroque_workout@mail.com',
          contact: 'baroque_workout@mail.com',
          ownerEmail: 'crocodile_mr0@mail.com',
          address: {
            city: 'São Paulo',
            neighborhood: 'Jardim Itapeva',
            number: '08',
            postalCode: '04674-070',
            state: 'SP',
            street: 'Rua General Antônio Tavares da Motta',
          },
        })
        .expect(403);
    });

    it('Should return 403 if ownerEmail does not exist', async () => {
      const authorizationToken = sign(
        { id: 'any_user_id', role: 'any_role_name', permissions: [Permissions.CREATE_GYM] },
        env.secret,
        { expiresIn: AuthToken.expirationInMs / 1000 },
      );

      await request(app)
        .post('/api/gym')
        .set('authorization', authorizationToken)
        .send({
          name: 'Baroque Workout',
          email: 'baroque_workout@mail.com',
          contact: 'baroque_workout@mail.com',
          ownerEmail: 'crocodile_mr0@mail.com',
          address: {
            city: 'São Paulo',
            neighborhood: 'Jardim Itapeva',
            number: '08',
            postalCode: '04674-070',
            state: 'SP',
            street: 'Rua General Antônio Tavares da Motta',
          },
        })
        .expect(403);
    });
  });
});
