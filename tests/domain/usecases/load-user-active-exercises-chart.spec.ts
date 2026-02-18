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
  6;
  it('Should call LoadExercisesChartByIdRepository with correct input', async () => {
    await sut(input);

    expect(exercisesChartRepository.loadById).toHaveBeenCalledWith({ id: userMock().activeChartId });
    expect(exercisesChartRepository.loadById).toHaveBeenCalledTimes(1);
  });
});
