import type {
  SaveExercisesChartRepository,
  UpdateUserActiveExercisesChartRepository,
} from '@/domain/contracts/repositories';
import type { ExercisesChart } from '@/domain/entities/generic-types/exercises-chart';

type Input = ExercisesChart;
type Output = void;
export type CreateExercisesChart = (input: Input) => Promise<Output>;
type Setup = (
  exercisesChartRepository: SaveExercisesChartRepository,
  userRepository: UpdateUserActiveExercisesChartRepository,
) => CreateExercisesChart;

export const setupCreateExercisesChart: Setup = (exercisesChartRepository, userRepository) => {
  return async (input) => {
    const { id } = await exercisesChartRepository.saveExercisesChart(input);
    await userRepository.updateActiveChart({ exercisesChartId: id, userId: input.userId });
  };
};
