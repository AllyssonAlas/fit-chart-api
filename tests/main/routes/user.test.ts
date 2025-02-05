import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import request from 'supertest';

import { app } from '@/main/config/app';
import { env } from '@/main/config/env';

import { clearAllTables, createRole } from '@/tests/mocks/infra';

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
            complement: '',
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
            complement: '',
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
          email: 'ed_girao05@mail.com',
          password: 'ed_gir@0.123',
        })
        .expect(401);
    });

    it('Should return 200 on success', async () => {
      await createRole(prisma, 'admin');

      const password = await hash('ed_gir@0.123', env.salt);

      await prisma.user.create({
        data: {
          name: 'Edmundo Girão',
          email: 'ed_girao05@mail.com',
          password,
          role: 'admin',
          contact: '(41) 99709-0876',
        },
      });

      await request(app)
        .post('/api/login')
        .send({
          email: 'ed_girao05@mail.com',
          password: 'ed_gir@0.123',
        })
        .expect(200);
    });
  });
});
