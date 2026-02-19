import { PrismaClient } from '@prisma/client';

import type {
  CreateUserRepository,
  LoadManyUsersRepository,
  LoadUserByEmailRepository,
  UpdateUserActiveExercisesChartRepository,
} from '@/domain/contracts/repositories';

type Repository = CreateUserRepository &
  LoadUserByEmailRepository &
  LoadManyUsersRepository &
  UpdateUserActiveExercisesChartRepository;
export class UserRepository implements Repository {
  async create(input: CreateUserRepository.Input): Promise<CreateUserRepository.Output> {
    const prisma = new PrismaClient();
    await prisma.user.create({
      data: {
        ...input,
        activeChartId: undefined,
        address: {
          create: input.address,
        },
      },
    });
  }

  async loadByEmail(input: LoadUserByEmailRepository.Input): Promise<LoadUserByEmailRepository.Output> {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({ where: input });
    if (!user) return null;
    const { activeChartId, ...userData } = user;
    return userData;
  }

  async loadMany({ emails }: LoadManyUsersRepository.Input): Promise<LoadManyUsersRepository.Output> {
    const prisma = new PrismaClient();
    const users = await prisma.user.findMany({
      where: { email: { in: emails } },
    });
    return users.map(({ activeChartId, ...user }) => user);
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
