import { type MockProxy, mock } from 'jest-mock-extended';

import { Controller, ListUserExercisesChartsController } from '@/application/controllers';
import type { LoadUserExercisesChartsRepository } from '@/domain/contracts/repositories';

describe('ListUserExercisesChartsController', () => {
  const request = {
    userId: 'any_user_id',
  };

  let sut: ListUserExercisesChartsController;
  let exercisesChartsRepository: MockProxy<LoadUserExercisesChartsRepository>;

  beforeAll(() => {
    exercisesChartsRepository = mock();
  });

  beforeEach(() => {
    sut = new ListUserExercisesChartsController(exercisesChartsRepository);
  });

  it('Should extend controller', () => {
    expect(sut).toBeInstanceOf(Controller);
  });

  it('Should call LoadGymExercisesRepository with correct input', async () => {
    await sut.handle(request);

    expect(exercisesChartsRepository.loadExercisesCharts).toHaveBeenCalledWith(request);
    expect(exercisesChartsRepository.loadExercisesCharts).toHaveBeenCalledTimes(1);
  });
});
