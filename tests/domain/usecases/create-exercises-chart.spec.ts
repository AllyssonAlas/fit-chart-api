import { type MockProxy, mock } from 'jest-mock-extended';

import type {
  CreateExercisesChartRepository,
  UpdateUserActiveExercisesChartRepository,
} from '@/domain/contracts/repositories';
import { type CreateExercisesChart, setupCreateExercisesChart } from '@/domain/usecases';

jest.mock('@/domain/entities/user');

describe('CreateExercisesChart', () => {
  const input = {
    userId: 'any_user_id',
    goals: 'any_goal',
    observation: 'any_observation',
    divisions: [
      { name: 'any_division_1', weekDays: [0, 2] },
      { name: 'any_division_2', weekDays: [1, 3] },
    ],
    exercises: [
      { exerciseId: 'any_exercise_id_1', series: 4, repts: 12, weight: 20, division: 'any_division_1' },
      { exerciseId: 'any_exercise_id_2', series: 3, repts: 10, weight: 30, division: 'any_division_2' },
    ],
  };

  let sut: MockProxy<CreateExercisesChart>;
  let exercisesChartRepository: MockProxy<CreateExercisesChartRepository>;
  let userRepository: MockProxy<UpdateUserActiveExercisesChartRepository>;

  beforeAll(() => {
    exercisesChartRepository = mock();
    exercisesChartRepository.createExercisesChart.mockResolvedValue({ id: 'any_exercises_chart_id' });
    userRepository = mock();
  });

  beforeEach(() => {
    sut = setupCreateExercisesChart(exercisesChartRepository, userRepository);
  });

  it('Should call CreateExercisesChartRepository with correct input', async () => {
    await sut(input);

    expect(exercisesChartRepository.createExercisesChart).toHaveBeenCalledWith(input);
    expect(exercisesChartRepository.createExercisesChart).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if LoadManyUsersRepository throws', async () => {
    const error = new Error('create_exercises_chart_repository_error');
    exercisesChartRepository.createExercisesChart.mockRejectedValueOnce(error);

    const promise = sut(input);

    await expect(promise).rejects.toThrow(error);
  });

  it('Should call UpdateUserActiveExercisesChartRepository with correct input', async () => {
    await sut(input);

    expect(userRepository.updateActiveChart).toHaveBeenCalledWith({
      exercisesChartId: 'any_exercises_chart_id',
      userId: 'any_user_id',
    });
    expect(userRepository.updateActiveChart).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if UpdateUserActiveExercisesChartRepository throws', async () => {
    const error = new Error('update_user_active_exercises_chart_repository_error');
    userRepository.updateActiveChart.mockRejectedValueOnce(error);

    const promise = sut(input);

    await expect(promise).rejects.toThrow(error);
  });
});
