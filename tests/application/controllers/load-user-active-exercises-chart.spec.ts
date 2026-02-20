import { Controller, LoadUserActiveExercisesChartController } from '@/application/controllers';
import { ServerError } from '@/application/errors';

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

  it('Should return 500 if LoadUserActiveExercisesChart throws', async () => {
    const error = new Error('load_user_active_exercises_chart_error');
    loadUserActiveExercisesChart.mockRejectedValueOnce(error);

    const response = await sut.handle(request);

    expect(response).toEqual({
      data: new ServerError(error),
      statusCode: 500,
    });
  });

  it('Should return 204 if LoadGymExercisesRepository returns null', async () => {
    loadUserActiveExercisesChart.mockResolvedValueOnce(null);

    const response = await sut.handle(request);

    expect(response).toEqual({
      data: null,
      statusCode: 204,
    });
  });
});
