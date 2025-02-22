import { PrismaClient } from '@prisma/client';

import type { LoadManyUsersRepository, LoadUserRepository, SaveUserRepository } from '@/domain/contracts/repositories';

export class UserRepository implements SaveUserRepository, LoadUserRepository, LoadManyUsersRepository {
  async save(input: SaveUserRepository.Input): Promise<SaveUserRepository.Output> {
    const prisma = new PrismaClient();
    await prisma.user.create({
      data: {
        ...input,
        address: {
          create: input.address,
        },
      },
    });
  }

  async load(input: LoadUserRepository.Input): Promise<LoadUserRepository.Output> {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({ where: input });
    return user;
  }

  async loadMany({ emails }: LoadManyUsersRepository.Input): Promise<LoadManyUsersRepository.Output> {
    const prisma = new PrismaClient();
    const users = await prisma.user.findMany({
      where: { email: { in: emails } },
    });
    return users;
  }
}
