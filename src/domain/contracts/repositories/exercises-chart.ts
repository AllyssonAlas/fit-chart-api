import type { ExercisesChart } from '@/domain/entities/generic-types';

export namespace CreateExercisesChartRepository {
  export type Input = ExercisesChart;

  export type Output = { id: string };
}

export interface CreateExercisesChartRepository {
  createExercisesChart(input: CreateExercisesChartRepository.Input): Promise<CreateExercisesChartRepository.Output>;
}

export namespace LoadUserExercisesChartsRepository {
  export type Input = { userId: string };

  export type Output = Array<ExercisesChart & { id: string }>;
}

export interface LoadUserExercisesChartsRepository {
  loadExercisesCharts(
    input: LoadUserExercisesChartsRepository.Input,
  ): Promise<LoadUserExercisesChartsRepository.Output>;
}

export namespace LoadExercisesChartByIdRepository {
  export type Input = { id: string };

  export type Output = ExercisesChart & { id: string };
}

export interface LoadExercisesChartByIdRepository {
  loadById(input: LoadExercisesChartByIdRepository.Input): Promise<LoadExercisesChartByIdRepository.Output>;
}
