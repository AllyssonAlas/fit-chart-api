import { type MockProxy, mock } from 'jest-mock-extended';

import { Controller, ListGymExercisesController } from '@/application/controllers';
import type { LoadGymExercisesRepository } from '@/domain/contracts/repositories';

describe('ListGymExercisesController', () => {
  const request = {
    gymId: 'any_gym_id',
  };

  let sut: ListGymExercisesController;
  let gymRepository: MockProxy<LoadGymExercisesRepository>;

  beforeAll(() => {
    gymRepository = mock();
  });

  beforeEach(() => {
    sut = new ListGymExercisesController(gymRepository);
  });

  it('Should extend controller', () => {
    expect(sut).toBeInstanceOf(Controller);
  });

  it('Should call LoadGymExercisesRepository with correct input', async () => {
    await sut.handle(request);

    expect(gymRepository.loadExercises).toHaveBeenCalledWith(request);
    expect(gymRepository.loadExercises).toHaveBeenCalledTimes(1);
  });
});
