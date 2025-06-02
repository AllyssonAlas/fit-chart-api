import { PrismaClient } from '@prisma/client';

import { GymRepository } from '@/infra/database/postgres/repositories';

import { clearAllTables, createExercises, createGym, createRole, createUsers } from '@/tests/helpers';

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
    await clearAllTables(prisma);
  });

  describe('save', () => {
    it('Should save a Gym', async () => {
      await createRole(prisma);
      await createUsers(prisma, [
        { email: 'any_user_email_1@mail.com' },
        { email: 'any_user_email_2@mail.com' },
        { email: 'any_user_email_3@mail.com' },
      ]);
      await sut.save({
        name: 'any_name',
        email: 'any_email@mail.com',
        administrators: ['any_user_email_1@mail.com'],
        clients: ['any_user_email_2@mail.com'],
        instructors: ['any_user_email_3@mail.com'],
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
        include: { address: true, administrators: true, clients: true, instructors: true },
      });

      expect(gym?.id).toBeTruthy();
      expect(gym?.name).toBe('any_name');
      expect(gym?.email).toBe('any_email@mail.com');
      expect(gym?.administrators[0].email).toBe('any_user_email_1@mail.com');
      expect(gym?.clients[0].email).toBe('any_user_email_2@mail.com');
      expect(gym?.instructors[0].email).toBe('any_user_email_3@mail.com');
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

    it('Should load a Gym', async () => {
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
      await createGym(prisma, {
        id: 'any_gym_id_1',
        name: 'any_gym_name',
        contact: 'any_gym_contact',
        email: undefined,
      });
      await prisma.gym.create({
        data: {
          id: 'any_gym_id_2',
          name: 'any_gym_name',
          contact: 'any_gym_contact',
          email: 'any_gym_mail@mail.com',
          administrators: {
            connect: { id: 'any_user_id' },
          },
        },
      });

      const gymOne = await sut.load({ id: 'any_gym_id_1' });
      const gymTwo = await sut.load({ id: 'any_gym_id_2' });

      expect(gymOne?.name).toBe('any_gym_name');
      expect(gymOne?.email).toBeUndefined();
      expect(gymOne?.administrators).toEqual([]);
      expect(gymOne?.contact).toBe('any_gym_contact');

      expect(gymTwo?.name).toBe('any_gym_name');
      expect(gymTwo?.email).toBe('any_gym_mail@mail.com');
      expect(gymTwo?.administrators?.[0]).toMatchObject({
        id: 'any_user_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        role: 'any_role_name',
        contact: 'any_contact',
      });
      expect(gymTwo?.contact).toBe('any_gym_contact');
    });
  });

  describe('assignUsers', () => {
    it('Should assign Users to Gym', async () => {
      await createRole(prisma);
      await createUsers(prisma, [
        { email: 'any_user_email_1@mail.com' },
        { email: 'any_user_email_2@mail.com' },
        { email: 'any_user_email_3@mail.com' },
        { email: 'any_user_email_4@mail.com' },
        { email: 'any_user_email_5@mail.com' },
      ]);
      const { id: gymId } = await createGym(prisma, {
        id: 'any_gym_id_1',
        name: 'any_gym_name',
        contact: 'any_gym_contact',
      });

      await sut.assignUsers({ gymId, emails: ['any_user_email_2@mail.com'], usersType: 'administrators' });
      await sut.assignUsers({ gymId, emails: ['any_user_email_3@mail.com'], usersType: 'instructors' });
      await sut.assignUsers({
        gymId,
        emails: ['any_user_email_1@mail.com', 'any_user_email_4@mail.com', 'any_user_email_5@mail.com'],
        usersType: 'clients',
      });
      const gym = await prisma.gym.findUnique({
        where: { id: gymId },
        include: { address: true, administrators: true, clients: true, instructors: true },
      });

      expect(gym?.administrators).toHaveLength(1);
      expect(gym?.administrators[0].email).toBe('any_user_email_2@mail.com');
      expect(gym?.instructors).toHaveLength(1);
      expect(gym?.instructors[0].email).toBe('any_user_email_3@mail.com');
      expect(gym?.clients).toHaveLength(3);
      expect(gym?.clients[0].email).toBe('any_user_email_1@mail.com');
      expect(gym?.clients[1].email).toBe('any_user_email_4@mail.com');
      expect(gym?.clients[2].email).toBe('any_user_email_5@mail.com');
    });
  });

  describe('loadExercises', () => {
    it('Should return an empty array if gymId does not exist', async () => {
      const exercises = await sut.loadExercises({ gymId: 'any_gym_id' });

      expect(exercises).toHaveLength(0);
    });

    it('Should return an empty array if gym does not have exercises', async () => {
      const exercises = await sut.loadExercises({ gymId: 'any_gym_id' });

      expect(exercises).toHaveLength(0);
    });

    it('Should return an exercises list', async () => {
      const { id: gymOneId } = await createGym(prisma, { name: 'any_gym_name', contact: 'any_gym_contact' });
      const { id: gymTwoId } = await createGym(prisma, { name: 'any_gym_name', contact: 'any_gym_contact' });
      const { id: gymThreeId } = await createGym(prisma, { name: 'any_gym_name', contact: 'any_gym_contact' });
      await createExercises(prisma, 'any_exercise_category_1', [
        { name: 'exercise_1', availableAt: [gymOneId] },
        { name: 'exercise_2', equipment: 'any_equipment', availableAt: [gymOneId] },
        { name: 'exercise_4', availableAt: [gymTwoId] },
        { name: 'exercise_5', availableAt: [gymOneId, gymTwoId] },
      ]);
      await createExercises(prisma, 'any_exercise_category_2', [
        { name: 'exercise_3', availableAt: [gymOneId] },
        { name: 'exercise_6', availableAt: [gymTwoId] },
      ]);

      const gymOneExercises = await sut.loadExercises({ gymId: gymOneId });
      const gymTwoExercises = await sut.loadExercises({ gymId: gymTwoId });
      const gymThreeExercises = await sut.loadExercises({ gymId: gymThreeId });
      const invalidGymExercises = await sut.loadExercises({ gymId: 'invalid_gym_id' });

      expect(gymOneExercises).toHaveLength(4);
      expect(gymOneExercises[0].name).toBe('exercise_1');
      expect(gymOneExercises[0].category).toBe('any_exercise_category_1');
      expect(gymOneExercises[0].equipment).toBeUndefined();
      expect(gymOneExercises[1].name).toBe('exercise_2');
      expect(gymOneExercises[1].category).toBe('any_exercise_category_1');
      expect(gymOneExercises[1].equipment).toBe('any_equipment');
      expect(gymOneExercises[2].name).toBe('exercise_5');
      expect(gymOneExercises[2].category).toBe('any_exercise_category_1');
      expect(gymOneExercises[3].name).toBe('exercise_3');
      expect(gymOneExercises[3].category).toBe('any_exercise_category_2');
      expect(gymTwoExercises).toHaveLength(3);
      expect(gymTwoExercises[0].name).toBe('exercise_4');
      expect(gymTwoExercises[0].category).toBe('any_exercise_category_1');
      expect(gymTwoExercises[0].equipment).toBeUndefined();
      expect(gymTwoExercises[1].name).toBe('exercise_5');
      expect(gymTwoExercises[1].category).toBe('any_exercise_category_1');
      expect(gymTwoExercises[2].name).toBe('exercise_6');
      expect(gymTwoExercises[2].category).toBe('any_exercise_category_2');
      expect(gymThreeExercises).toHaveLength(0);
      expect(invalidGymExercises).toHaveLength(0);
    });
  });
});
