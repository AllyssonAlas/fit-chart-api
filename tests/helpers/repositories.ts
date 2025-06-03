import type { Exercise, Gym, PrismaClient, User } from '@prisma/client';

export const createUsers = async (prisma: PrismaClient, users: Partial<User>[]): Promise<void> => {
  await prisma.user.createMany({
    data: users.map((user) => ({
      name: 'Monkey D. Luffy',
      email: 'pirate_king@mail.com',
      contact: 'Anywhere in Grand Line',
      password: '123456',
      role: 'admin',
      ...user,
    })),
  });
};

export const createGym = async (prisma: PrismaClient, gym: Partial<Gym>): Promise<Gym> => {
  return await prisma.gym.create({
    data: {
      name: 'Baroque Workout',
      email: 'baroque_workout@mail.com',
      contact: 'baroque_workout@mail.com',
      ...gym,
    },
  });
};

export const createExercises = async (
  prisma: PrismaClient,
  categoryName: string,
  exercises: Array<Partial<Exercise> & { availableAt: string[] }>,
): Promise<void> => {
  await prisma.exerciseCategory.create({
    data: { name: categoryName },
  });

  for (const exercise of exercises) {
    await prisma.exercise.create({
      data: {
        name: 'any_exercise',
        category: categoryName,
        ...exercise,
        availableAt: { connect: exercise.availableAt.map((id) => ({ id })) },
      },
    });
  }
};

export const createRole = async (prisma: PrismaClient, name = 'admin'): Promise<void> => {
  await prisma.role.create({
    data: {
      name,
      permissions: { create: [{ name: 'permission_1' }, { name: 'permission_2' }] },
    },
  });
};

export const clearRoleTable = async (prisma: PrismaClient): Promise<void> => {
  await prisma.role.deleteMany({});
  await prisma.permission.deleteMany({});
};

export const clearUserTable = async (prisma: PrismaClient): Promise<void> => {
  await clearRoleTable(prisma);
  await prisma.user.deleteMany({});
};

export const clearGymTable = async (prisma: PrismaClient): Promise<void> => {
  await prisma.gym.deleteMany({});
};

export const clearExerciseTable = async (prisma: PrismaClient): Promise<void> => {
  await prisma.exercise.deleteMany({});
  await prisma.exerciseCategory.deleteMany({});
  await prisma.exercisesChart.deleteMany({});
};

export const clearAllTables = async (prisma: PrismaClient): Promise<void> => {
  await clearUserTable(prisma);
  await clearGymTable(prisma);
  await clearExerciseTable(prisma);
};
