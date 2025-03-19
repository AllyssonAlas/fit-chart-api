import { PrismaClient } from '@prisma/client';

import type { LoadGymRepository, SaveGymRepository } from '@/domain/contracts/repositories';

export class GymRepository implements SaveGymRepository, LoadGymRepository {
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

  async load({ id }: LoadGymRepository.Input): Promise<LoadGymRepository.Output> {
    const prisma = new PrismaClient();
    await prisma.gym.findUnique({
      where: { id },
    });
    return null;
  }
}
