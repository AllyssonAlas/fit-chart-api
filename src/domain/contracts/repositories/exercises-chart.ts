import type { ExercisesChart, RawExercisesChart } from '@/domain/entities/generic-types';

export namespace CreateExercisesChartRepository {
  export type Input = RawExercisesChart;

  export type Output = { id: string };
}

export interface CreateExercisesChartRepository {
  createExercisesChart(input: CreateExercisesChartRepository.Input): Promise<CreateExercisesChartRepository.Output>;
}

export namespace LoadUserExercisesChartsRepository {
  export type Input = { userId: string };

  export type Output = Array<RawExercisesChart & { id: string }>;
}

export interface LoadUserExercisesChartsRepository {
  loadExercisesCharts(
    input: LoadUserExercisesChartsRepository.Input,
  ): Promise<LoadUserExercisesChartsRepository.Output>;
}

export namespace LoadExercisesChartByIdRepository {
  export type Input = { id: string };

  export type Output = ExercisesChart;
}

export interface LoadExercisesChartByIdRepository {
  loadById(input: LoadExercisesChartByIdRepository.Input): Promise<LoadExercisesChartByIdRepository.Output>;
}
