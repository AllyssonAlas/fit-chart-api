import type { ExercisesChart } from '@/domain/entities/generic-types';

export namespace SaveExercisesChartRepository {
  export type Input = ExercisesChart;

  export type Output = void;
}

export interface SaveExercisesChartRepository {
  saveExercisesChart(input: SaveExercisesChartRepository.Input): Promise<SaveExercisesChartRepository.Output>;
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
