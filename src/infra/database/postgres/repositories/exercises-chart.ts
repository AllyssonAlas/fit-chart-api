import { PrismaClient } from '@prisma/client';

import type {
  CreateExercisesChartRepository,
  LoadExercisesChartByIdRepository,
  LoadUserExercisesChartsRepository,
} from '@/domain/contracts/repositories';

type Repository = CreateExercisesChartRepository & LoadExercisesChartByIdRepository & LoadUserExercisesChartsRepository;

export class ExercisesChartRepository implements Repository {
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

  async loadById(input: LoadExercisesChartByIdRepository.Input): Promise<LoadExercisesChartByIdRepository.Output> {
    const prisma = new PrismaClient();

    const { observation, ...exercisesChart } = await prisma.exercisesChart.findUniqueOrThrow({
      where: input,
      include: { exercises: true, divisions: true },
    });
    const exercisesList = await prisma.exercise.findMany({
      where: { id: { in: exercisesChart.exercises.map(({ exerciseId }) => exerciseId) } },
    });
    const exercisesFormatted = exercisesChart.exercises.map((exercise) => {
      const exerciseIndex = exercisesList.findIndex(({ id }) => exercise.exerciseId === id);
      const { reference, equipment, ...exerciseData } = exercisesList[exerciseIndex];
      if (reference) Object.assign(exerciseData, { reference });
      if (equipment) Object.assign(exerciseData, { equipment });
      return { ...exercise, ...exerciseData };
    });
    if (observation) Object.assign(exercisesChart, { observation });
    return { ...exercisesChart, exercises: exercisesFormatted };
  }

  async loadExercisesCharts(
    input: LoadUserExercisesChartsRepository.Input,
  ): Promise<LoadUserExercisesChartsRepository.Output> {
    const prisma = new PrismaClient();

    const exercisesCharts = await prisma.exercisesChart.findMany({
      where: input,
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
