import request from 'supertest';

import { app } from '@/main/config/app';

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
  });
});
