import { PrismaClient } from '@prisma/client';

import type {
  LoadManyUsersRepository,
  LoadUserRepository,
  SaveUserRepository,
  UpdateUserActiveExercisesChartRepository,
} from '@/domain/contracts/repositories';

type Repository = SaveUserRepository &
  LoadUserRepository &
  LoadManyUsersRepository &
  UpdateUserActiveExercisesChartRepository;
export class UserRepository implements Repository {
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

  async updateActiveChart(
    input: UpdateUserActiveExercisesChartRepository.Input,
  ): Promise<UpdateUserActiveExercisesChartRepository.Output> {
    const prisma = new PrismaClient();
    await prisma.user.update({
      where: { id: input.userId },
      data: { activeChartId: input.exercisesChartId },
    });
  }
}
