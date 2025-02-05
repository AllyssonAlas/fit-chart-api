import { PrismaClient } from '@prisma/client';
import request from 'supertest';

import { app } from '@/main/config/app';

describe('User Routes', () => {
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  afterEach(async () => {
    await prisma.user.deleteMany({});
    await prisma.role.deleteMany({});
    await prisma.permission.deleteMany({});
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
      await prisma.role.create({
        data: {
          name: 'admin',
          permissions: { create: [{ name: 'any_permission_1' }, { name: 'any_permission_2' }] },
        },
      });

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
  });
});
