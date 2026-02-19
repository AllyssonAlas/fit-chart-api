import type { LoadExercisesChartByIdRepository, LoadUserByIdRepository } from '@/domain/contracts/repositories';
import type { ExercisesChart } from '@/domain/entities/generic-types';

type Input = { userId: string };
type Output = ExercisesChart | null;
export type LoadUserActiveExercisesChart = (input: Input) => Promise<Output>;
type Setup = (
  userRepository: LoadUserByIdRepository,
  exercisesChartRepository: LoadExercisesChartByIdRepository,
) => LoadUserActiveExercisesChart;

export const setupLoadUserActiveExercisesChart: Setup = (userRepository, exercisesChartRepository) => {
  return async ({ userId }) => {
    const { activeChartId } = await userRepository.loadById({ id: userId });
    if (!activeChartId) return null;
    const activeExercisesChart = await exercisesChartRepository.loadById({ id: activeChartId });
    return activeExercisesChart;
  };
};
