import { PrismaClient } from '@prisma/client';

import type { LoadRoleRepository } from '@/domain/contracts/repositories';

export class RoleRepository implements LoadRoleRepository {
  async load(input: LoadRoleRepository.Input): Promise<LoadRoleRepository.Output> {
    return null;
  }
}
