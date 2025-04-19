import { PrismaClient } from '@prisma/client';

import type {
  AssignUsersToGymRepository,
  LoadGymExercisesRepository,
  LoadGymRepository,
  SaveGymRepository,
} from '@/domain/contracts/repositories';

type RepositoryType = SaveGymRepository & LoadGymRepository & AssignUsersToGymRepository & LoadGymExercisesRepository;

export class GymRepository implements RepositoryType {
  async save(input: SaveGymRepository.Input): Promise<SaveGymRepository.Output> {
    const prisma = new PrismaClient();
    await prisma.gym.create({
      data: {
        ...input,
        administrators: {
          connect: input.administrators?.map((email) => ({ email })),
        },
        clients: {
          connect: input.clients?.map((email) => ({ email })),
        },
        instructors: {
          connect: input.instructors?.map((email) => ({ email })),
        },
        address: { create: input.address },
      },
    });
  }

  async load({ id }: LoadGymRepository.Input): Promise<LoadGymRepository.Output> {
    const prisma = new PrismaClient();
    const gym = await prisma.gym.findUnique({
      where: { id },
      include: { address: true, administrators: true },
    });
    if (gym) {
      const gymFormatted = Object.entries(gym).map(([key, value]) => {
        return [key, value === null ? undefined : value];
      });
      return Object.fromEntries(gymFormatted);
    }
    return null;
  }

  async assignUsers({
    gymId,
    emails,
    usersType,
  }: AssignUsersToGymRepository.Input): Promise<AssignUsersToGymRepository.Output> {
    const prisma = new PrismaClient();
    await prisma.gym.update({
      where: { id: gymId },
      data: {
        [usersType]: {
          connect: emails.map((email) => ({ email })),
        },
      },
    });
  }

  async loadExercises({ gymId }: LoadGymExercisesRepository.Input): Promise<LoadGymExercisesRepository.Output> {
    const prisma = new PrismaClient();

    const exercises = await prisma.exercise.findMany({
      where: {
        availableAt: { some: { id: gymId } },
      },
    });
    return exercises.map((exercise) => {
      const exerciseFormatted = Object.entries(exercise).map(([key, value]) => {
        return [key, value === null ? undefined : value];
      });
      return Object.fromEntries(exerciseFormatted);
    });
  }
}
