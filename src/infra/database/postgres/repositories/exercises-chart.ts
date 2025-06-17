import { PrismaClient } from '@prisma/client';

import type {
  CreateExercisesChartRepository,
  LoadUserExercisesChartsRepository,
} from '@/domain/contracts/repositories';

export class ExercisesChartRepository implements CreateExercisesChartRepository, LoadUserExercisesChartsRepository {
  async createExercisesChart(
    input: CreateExercisesChartRepository.Input,
  ): Promise<CreateExercisesChartRepository.Output> {
    const prisma = new PrismaClient();
    const createdChart = await prisma.exercisesChart.create({
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
    return createdChart;
  }

  async loadExercisesCharts({
    userId,
  }: LoadUserExercisesChartsRepository.Input): Promise<LoadUserExercisesChartsRepository.Output> {
    const prisma = new PrismaClient();

    const exercisesCharts = await prisma.exercisesChart.findMany({
      where: {
        userId,
      },
      include: { exercises: true, divisions: true },
    });
    return exercisesCharts.map((chart) => {
      const chartFormatted = Object.entries(chart).map(([key, value]) => {
        return [key, value === null ? undefined : value];
      });
      return Object.fromEntries(chartFormatted);
    });
  }
}
