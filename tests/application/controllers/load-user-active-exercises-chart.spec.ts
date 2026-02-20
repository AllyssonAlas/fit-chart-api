import { Controller, LoadUserActiveExercisesChartController } from '@/application/controllers';

describe('LoadUserActiveExercisesChartController', () => {
  const request = {
    userId: 'any_user_id',
  };

  let sut: LoadUserActiveExercisesChartController;
  let loadUserActiveExercisesChart: jest.Mock;

  beforeAll(() => {
    loadUserActiveExercisesChart = jest.fn();
  });

  beforeEach(() => {
    sut = new LoadUserActiveExercisesChartController(loadUserActiveExercisesChart);
  });

  it('Should extend controller', () => {
    expect(sut).toBeInstanceOf(Controller);
  });

  it('Should call LoadUserActiveExercisesChart with correct input', async () => {
    await sut.handle(request);

    expect(loadUserActiveExercisesChart).toHaveBeenCalledWith(request);
    expect(loadUserActiveExercisesChart).toHaveBeenCalledTimes(1);
  });
});
