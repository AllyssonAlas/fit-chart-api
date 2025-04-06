import { type MockProxy, mock } from 'jest-mock-extended';

import { Controller, ListGymExercisesController } from '@/application/controllers';
import { ServerError } from '@/application/errors';
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

  it('Should rethrow if LoadGymExercisesRepository throws', async () => {
    const error = new Error('load_gym_exercises_repository_error');
    gymRepository.loadExercises.mockRejectedValueOnce(error);

    const response = await sut.handle(request);

    expect(response).toEqual({
      data: new ServerError(error),
      statusCode: 500,
    });
  });

  it('Should return 204 if LoadGymExercisesRepository returns an empty list', async () => {
    gymRepository.loadExercises.mockResolvedValueOnce([]);

    const response = await sut.handle(request);

    expect(response).toEqual({
      data: null,
      statusCode: 204,
    });
  });
});
