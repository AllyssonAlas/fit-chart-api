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
    loadUserActiveExercisesChart.mockResolvedValue({
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

  it('Should return 200 on success', async () => {
    const response = await sut.handle(request);

    expect(response).toEqual({
      data: {
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
      },
      statusCode: 200,
    });
  });
});
