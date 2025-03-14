import { PrismaClient } from '@prisma/client';

import type { SaveGymRepository } from '@/domain/contracts/repositories';

export class GymRepository implements SaveGymRepository {
  async save(input: SaveGymRepository.Input): Promise<SaveGymRepository.Output> {
    const prisma = new PrismaClient();
    await prisma.gym.create({
      data: {
        ...input,
        administrators: {
          connect: input.administrators?.map((email) => ({ email })),
        },
        address: { create: input.address },
      },
    });
  }
}
