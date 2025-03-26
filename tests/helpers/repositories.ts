import type { PrismaClient, User } from '@prisma/client';

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

export const createRole = async (prisma: PrismaClient, name = 'any_role_name'): Promise<void> => {
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

export const clearAllTables = async (prisma: PrismaClient): Promise<void> => {
  await clearUserTable(prisma);
  await clearGymTable(prisma);
};
