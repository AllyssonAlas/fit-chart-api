import { PrismaClient } from '@prisma/client';

import { UserRepository } from '@/infra/database/postgres/repositories';

import { clearUserTable, createExercises, createExercisesChart, createRole, createUsers } from '@/tests/helpers';

describe('UserRepository', () => {
  let prisma: PrismaClient;
  let sut: UserRepository;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  beforeEach(() => {
    sut = new UserRepository();
  });

  afterEach(async () => {
    await clearUserTable(prisma);
  });

  describe('create', () => {
    it('Should create an User', async () => {
      await createRole(prisma, 'any_role_name');

      await sut.create({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        role: 'any_role_name',
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
      const user = await prisma.user.findUnique({ where: { email: 'any_email@mail.com' }, include: { address: true } });

      expect(user?.id).toBeTruthy();
      expect(user?.name).toBe('any_name');
      expect(user?.email).toBe('any_email@mail.com');
      expect(user?.password).toBe('any_password');
      expect(user?.role).toBe('any_role_name');
      expect(user?.contact).toBe('any_contact');
      expect(user?.address?.city).toBe('any_city');
      expect(user?.address?.complement).toBe('any_complement');
      expect(user?.address?.neighborhood).toBe('any_neighborhood');
      expect(user?.address?.number).toBe('any_number');
      expect(user?.address?.postalCode).toBe('any_postalCode');
      expect(user?.address?.state).toBe('st');
      expect(user?.address?.street).toBe('any_street');
    });
  });

  describe('loadByEmail', () => {
    it('Should return null if email does not exist', async () => {
      const user = await sut.loadByEmail({ email: 'any_email@mail.com' });

      expect(user).toBeNull();
    });

    it('Should return an User if email exists', async () => {
      await createRole(prisma, 'any_role_name');
      await prisma.user.create({
        data: {
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password',
          role: 'any_role_name',
          contact: 'any_contact',
        },
      });

      const user = await sut.loadByEmail({ email: 'any_email@mail.com' });

      expect(user?.id).toBeTruthy();
      expect(user?.name).toBe('any_name');
      expect(user?.email).toBe('any_email@mail.com');
      expect(user?.password).toBe('any_password');
      expect(user?.role).toBe('any_role_name');
      expect(user?.contact).toBe('any_contact');
      expect(user?.address).toBeUndefined();
    });
  });

  describe('loadById', () => {
    it('Should return an User with activeChartId undefined', async () => {
      await createRole(prisma, 'any_role_name');
      await prisma.user.create({
        data: {
          id: 'any_user_id',
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password',
          role: 'any_role_name',
          contact: 'any_contact',
        },
      });

      const user = await sut.loadById({ id: 'any_user_id' });

      expect(user.id).toBe('any_user_id');
      expect(user.name).toBe('any_name');
      expect(user.email).toBe('any_email@mail.com');
      expect(user.password).toBe('any_password');
      expect(user.activeChartId).toBeUndefined();
      expect(user.role).toBe('any_role_name');
      expect(user.contact).toBe('any_contact');
      expect(user.address).toBeUndefined();
    });

    it('Should return an User', async () => {
      await createRole(prisma, 'any_role_name');
      await prisma.user.create({
        data: {
          id: 'any_user_id',
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password',
          role: 'any_role_name',
          contact: 'any_contact',
        },
      });
      await createExercisesChart(prisma, [
        {
          id: 'any_exercise_chart_id',
          userId: 'any_user_id',
          goals: 'any_goal_1',
          observation: 'any_observation',
          divisions: [],
          exercises: [],
        },
      ]);
      await prisma.user.update({
        where: { id: 'any_user_id' },
        data: { activeChartId: 'any_exercise_chart_id' },
      });

      const user = await sut.loadById({ id: 'any_user_id' });

      expect(user.id).toBe('any_user_id');
      expect(user.name).toBe('any_name');
      expect(user.email).toBe('any_email@mail.com');
      expect(user.password).toBe('any_password');
      expect(user.activeChartId).toBe('any_exercise_chart_id');
      expect(user.role).toBe('any_role_name');
      expect(user.contact).toBe('any_contact');
      expect(user.address).toBeUndefined();
    });
  });

  describe('loadMany', () => {
    it('Should return an empty list if all emails do not exist', async () => {
      const users = await sut.loadMany({ emails: ['any_email_1@mail.com', 'any_email_2@mail.com'] });

      expect(users).toEqual([]);
    });

    it('Should return a list with only emails found', async () => {
      await createRole(prisma, 'any_role_name');
      await prisma.user.create({
        data: {
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password',
          role: 'any_role_name',
          contact: 'any_contact',
        },
      });

      const users = await sut.loadMany({ emails: ['any_email_1@mail.com', 'any_email@mail.com'] });

      expect(users.length).toBe(1);
      expect(users[0].name).toBe('any_name');
      expect(users[0].email).toBe('any_email@mail.com');
      expect(users[0].password).toBe('any_password');
      expect(users[0].role).toBe('any_role_name');
      expect(users[0].contact).toBe('any_contact');
    });

    it('Should return a list with all emails', async () => {
      await createRole(prisma, 'any_role_name');
      await prisma.user.createMany({
        data: [
          {
            name: 'any_name_1',
            email: 'any_email_1@mail.com',
            password: 'any_password_1',
            role: 'any_role_name',
            contact: 'any_contact_1',
          },
          {
            name: 'any_name_2',
            email: 'any_email_2@mail.com',
            password: 'any_password_2',
            role: 'any_role_name',
            contact: 'any_contact_2',
          },
        ],
      });

      const users = await sut.loadMany({ emails: ['any_email_1@mail.com', 'any_email_2@mail.com'] });

      expect(users.length).toBe(2);
      expect(users[0].name).toBe('any_name_1');
      expect(users[0].email).toBe('any_email_1@mail.com');
      expect(users[0].password).toBe('any_password_1');
      expect(users[0].role).toBe('any_role_name');
      expect(users[0].contact).toBe('any_contact_1');
      expect(users[1].name).toBe('any_name_2');
      expect(users[1].email).toBe('any_email_2@mail.com');
      expect(users[1].password).toBe('any_password_2');
      expect(users[1].role).toBe('any_role_name');
      expect(users[1].contact).toBe('any_contact_2');
    });
  });

  describe('updateActiveChart', () => {
    it('Should update active chart id', async () => {
      await createRole(prisma, 'any_role_name');
      await createUsers(prisma, [{ id: 'any_user_id', role: 'any_role_name' }]);
      await createExercisesChart(prisma, [
        {
          id: 'any_exercises_chat_id',
          userId: 'any_user_id',
          goals: 'any_goal_1',
          divisions: [],
          exercises: [],
        },
      ]);

      const userRecentlyCreated = await prisma.user.findUnique({ where: { id: 'any_user_id' } });

      expect(userRecentlyCreated?.activeChartId).toBeFalsy();

      await sut.updateActiveChart({ exercisesChartId: 'any_exercises_chat_id', userId: 'any_user_id' });

      const userUpdated = await prisma.user.findUnique({ where: { id: 'any_user_id' } });

      expect(userUpdated?.activeChartId).toBe('any_exercises_chat_id');
    });
  });
});
