import type { LoadUserByIdRepository } from '@/domain/contracts/repositories';

type Input = { userId: string };
type Output = void | null;
export type LoadUserActiveExercisesChart = (input: Input) => Promise<Output>;
type Setup = (userRepository: LoadUserByIdRepository) => LoadUserActiveExercisesChart;

export const setupLoadUserActiveExercisesChart: Setup = (userRepository) => {
  return async ({ userId }) => {
    const { activeChartId } = await userRepository.loadById({ id: userId });
    if (!activeChartId) return null;
  };
};
