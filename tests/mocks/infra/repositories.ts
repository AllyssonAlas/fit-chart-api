import type { PrismaClient } from '@prisma/client';

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
  await prisma.user.deleteMany({});
};

export const clearAllTables = async (prisma: PrismaClient): Promise<void> => {
  await clearRoleTable(prisma);
  await clearUserTable(prisma);
};
