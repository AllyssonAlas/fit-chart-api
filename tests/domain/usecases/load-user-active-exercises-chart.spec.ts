import { type MockProxy, mock } from 'jest-mock-extended';

import type { LoadExercisesChartByIdRepository, LoadUserByIdRepository } from '@/domain/contracts/repositories';
import { type LoadUserActiveExercisesChart, setupLoadUserActiveExercisesChart } from '@/domain/usecases';

import { userMock } from '@/tests/mocks/domain';

jest.mock('@/domain/entities/user');

describe('LoadUserActiveExercisesChart', () => {
  const input = {
    userId: 'any_user_id',
  };

  let sut: MockProxy<LoadUserActiveExercisesChart>;
  let userRepository: MockProxy<LoadUserByIdRepository>;
  let exercisesChartRepository: MockProxy<LoadExercisesChartByIdRepository>;

  beforeAll(() => {
    userRepository = mock();
    userRepository.loadById.mockResolvedValue(userMock());
    exercisesChartRepository = mock();
    exercisesChartRepository.loadById.mockResolvedValue({
      id: 'any_exercises_chart_id',
      userId: 'any_user_id',
      goals: 'any_goal',
      observation: 'any_observation',
      divisions: [
        { name: 'any_division_1', weekDays: [0, 1] },
        { name: 'any_division_2', weekDays: [2, 3] },
      ],
      exercises: [
        {
          exerciseId: 'any_exercise_id_1',
          name: 'any_exercise_name_1',
          category: 'any_category_1',
          equipment: 'any_exercise_equipment',
          reference: 'any_exercise_reference',
          series: 4,
          repts: 12,
          weight: 20,
          division: 'any_division_1',
        },
        {
          exerciseId: 'any_exercise_id_2',
          name: 'any_exercise_name_2',
          category: 'any_category_2',
          series: 3,
          repts: 10,
          weight: 30,
          division: 'any_division_2',
        },
      ],
    });
  });

  beforeEach(() => {
    sut = setupLoadUserActiveExercisesChart(userRepository, exercisesChartRepository);
  });

  it('Should call LoadUserByIdRepository with correct input', async () => {
    await sut(input);

    expect(userRepository.loadById).toHaveBeenCalledWith({ id: input.userId });
    expect(userRepository.loadById).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if LoadUserByIdRepository throws', async () => {
    userRepository.loadById.mockRejectedValueOnce(new Error('load_user_by_id_repository_error'));

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new Error('load_user_by_id_repository_error'));
  });

  it('Should return null if LoadUserByIdRepository output activeChartId is undefined', async () => {
    userRepository.loadById.mockResolvedValueOnce({ ...userMock(), activeChartId: undefined });

    const result = await sut(input);

    expect(result).toBeNull();
  });

  it('Should call LoadExercisesChartByIdRepository with correct input', async () => {
    await sut(input);

    expect(exercisesChartRepository.loadById).toHaveBeenCalledWith({ id: userMock().activeChartId });
    expect(exercisesChartRepository.loadById).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if LoadExercisesChartByIdRepository throws', async () => {
    exercisesChartRepository.loadById.mockRejectedValueOnce(new Error('load_exercises_chart_by_id_repository_error'));

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new Error('load_exercises_chart_by_id_repository_error'));
  });

  it('Should return correct output on success', async () => {
    const result = await sut(input);

    expect(result).toEqual({
      id: 'any_exercises_chart_id',
      userId: 'any_user_id',
      goals: 'any_goal',
      observation: 'any_observation',
      divisions: [
        { name: 'any_division_1', weekDays: [0, 1] },
        { name: 'any_division_2', weekDays: [2, 3] },
      ],
      exercises: [
        {
          exerciseId: 'any_exercise_id_1',
          name: 'any_exercise_name_1',
          category: 'any_category_1',
          equipment: 'any_exercise_equipment',
          reference: 'any_exercise_reference',
          series: 4,
          repts: 12,
          weight: 20,
          division: 'any_division_1',
        },
        {
          exerciseId: 'any_exercise_id_2',
          name: 'any_exercise_name_2',
          category: 'any_category_2',
          series: 3,
          repts: 10,
          weight: 30,
          division: 'any_division_2',
        },
      ],
    });
  });
});
