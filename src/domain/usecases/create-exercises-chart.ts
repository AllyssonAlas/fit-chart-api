import type { SaveExercisesChartRepository } from '@/domain/contracts/repositories';
import type { ExercisesChart } from '@/domain/entities/generic-types/exercises-chart';

type Input = ExercisesChart;
type Output = void;
export type CreateExercisesChart = (input: Input) => Promise<Output>;
type Setup = (exercisesChartRepository: SaveExercisesChartRepository) => CreateExercisesChart;

export const setupCreateExercisesChart: Setup = (exercisesChartRepository) => {
  return async (input) => {
    await exercisesChartRepository.saveExercisesChart(input);
  };
};
