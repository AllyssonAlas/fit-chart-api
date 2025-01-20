import { PrismaClient } from '@prisma/client';

import type { LoadUserRepository } from '@/domain/contracts/repositories';

export class UserRepository implements LoadUserRepository {
  async load(input: LoadUserRepository.Input): Promise<LoadUserRepository.Output> {
    return null;
  }
}
