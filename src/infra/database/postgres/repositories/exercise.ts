import { PrismaClient } from '@prisma/client';

import type { SaveExercisesChartRepository } from '@/domain/contracts/repositories';

export class ExerciseRepository implements SaveExercisesChartRepository {
  async saveExercisesChart(input: SaveExercisesChartRepository.Input): Promise<SaveExercisesChartRepository.Output> {
    const prisma = new PrismaClient();
    await prisma.exercisesChart.create({
      data: {
        ...input,
        userId: input.userId,
        exercises: {
          create: input.exercises.map(({ exerciseId, ...exercise }) => ({
            exercise: { connect: { id: exerciseId } },
            ...exercise,
          })),
        },
        divisions: {
          createMany: {
            data: input.divisions.map((division) => division),
          },
        },
      },
    });
  }
}
