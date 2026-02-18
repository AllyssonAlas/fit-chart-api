import { type MockProxy, mock } from 'jest-mock-extended';

import type { LoadUserByIdRepository } from '@/domain/contracts/repositories';
import { type LoadUserActiveExercisesChart, setupLoadUserActiveExercisesChart } from '@/domain/usecases';

jest.mock('@/domain/entities/user');

describe('LoadUserActiveExercisesChart', () => {
  const input = {
    userId: 'any_user_id',
  };

  let sut: MockProxy<LoadUserActiveExercisesChart>;
  let userRepository: MockProxy<LoadUserByIdRepository>;

  beforeAll(() => {
    userRepository = mock();
  });

  beforeEach(() => {
    sut = setupLoadUserActiveExercisesChart(userRepository);
  });

  it('Should call LoadUserByIdRepository with correct input', async () => {
    await sut(input);

    expect(userRepository.loadById).toHaveBeenCalledWith({ id: input.userId });
    expect(userRepository.loadById).toHaveBeenCalledTimes(1);
  });
});
