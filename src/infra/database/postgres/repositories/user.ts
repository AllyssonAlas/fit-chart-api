import { PrismaClient } from '@prisma/client';

import type { LoadUserRepository } from '@/domain/contracts/repositories';

export class UserRepository implements LoadUserRepository {
  async load(input: LoadUserRepository.Input): Promise<LoadUserRepository.Output> {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({ where: input });
    return user;
  }
}
