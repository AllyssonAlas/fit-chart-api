import { PrismaClient } from '@prisma/client';

import type { LoadRoleRepository } from '@/domain/contracts/repositories';

export class RoleRepository implements LoadRoleRepository {
  async load({ name }: LoadRoleRepository.Input): Promise<LoadRoleRepository.Output> {
    const prisma = new PrismaClient();
    const role = await prisma.role.findUnique({ where: { name } });
    return role;
  }
}
