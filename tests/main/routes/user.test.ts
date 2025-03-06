import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import request from 'supertest';

import { app } from '@/main/config/app';
import { env } from '@/main/config/env';

import { clearAllTables, createRole, createUsers } from '@/tests/helpers';

describe('User Routes', () => {
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  afterEach(async () => {
    clearAllTables(prisma);
  });

  describe('POST /user/create', () => {
    it('Should return 403 if role does not exist', async () => {
      await request(app)
        .post('/api/user/create')
        .send({
          name: 'Edmundo Girão',
          email: 'ed_girao05@mail.com',
          password: 'ed_gir@0.123',
          role: 'admin',
          contact: '(41) 99709-0876',
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

    it('Should return 200 on success', async () => {
      await createRole(prisma, 'admin');

      await request(app)
        .post('/api/user/create')
        .send({
          name: 'Edmundo Girão',
          email: 'ed_girao05@mail.com',
          password: 'ed_gir@0.123',
          role: 'admin',
          contact: '(41) 99709-0876',
          address: {
            city: 'São Paulo',
            neighborhood: 'Jardim Itapeva',
            number: '08',
            postalCode: '04674-070',
            state: 'SP',
            street: 'Rua General Antônio Tavares da Motta',
          },
        })
        .expect(200);
    });
  });

  describe('POST /login', () => {
    it('Should return 401 if credentials are invalid', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'nami_the_cat_buglar@mail.com',
          password: 'tr34$ur3s',
        })
        .expect(401);
    });

    it('Should return 200 on success', async () => {
      await createRole(prisma, 'admin');
      const password = await hash('c4Pt4!n', env.salt);
      const email = 'captain_usopp@mail.com';

      await createUsers(prisma, [{ email, password }]);

      await request(app).post('/api/login').send({ email, password: 'c4Pt4!n' }).expect(200);
    });
  });
});
