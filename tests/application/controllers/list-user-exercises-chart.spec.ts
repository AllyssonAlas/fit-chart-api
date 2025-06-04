import { type MockProxy, mock } from 'jest-mock-extended';

import { Controller, ListUserExercisesChartsController } from '@/application/controllers';
import { ServerError } from '@/application/errors';
import type { LoadUserExercisesChartsRepository } from '@/domain/contracts/repositories';

describe('ListUserExercisesChartsController', () => {
  const request = {
    userId: 'any_user_id',
  };

  let sut: ListUserExercisesChartsController;
  let exercisesChartsRepository: MockProxy<LoadUserExercisesChartsRepository>;

  beforeAll(() => {
    exercisesChartsRepository = mock();
    exercisesChartsRepository.loadExercisesCharts.mockResolvedValue([
      {
        id: 'any_exercises_chart_id_1',
        userId: 'any_user_id_1',
        goals: 'any_goal_1',
        observation: 'any_observation',
        divisions: [
          { name: 'any_division_1', weekDays: [0, 1] },
          { name: 'any_division_2', weekDays: [2, 3] },
        ],
        exercises: [
          { exerciseId: 'any_exercise_id_1', series: 4, repts: 12, weight: 20, division: 'any_division_1' },
          { exerciseId: 'any_exercise_id_2', series: 3, repts: 10, weight: 30, division: 'any_division_2' },
        ],
      },
      {
        id: 'any_exercises_chart_id_2',
        userId: 'any_user_id_1',
        goals: 'any_goal_2',
        divisions: [
          { name: 'any_division_1', weekDays: [0, 1] },
          { name: 'any_division_2', weekDays: [2, 3] },
        ],
        exercises: [
          { exerciseId: 'any_exercise_id_1', series: 4, repts: 12, weight: 20, division: 'any_division_1' },
          { exerciseId: 'any_exercise_id_2', series: 3, repts: 10, weight: 30, division: 'any_division_2' },
        ],
      },
    ]);
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

  it('Should return 500 if LoadGymExercisesRepository throws', async () => {
    const error = new Error('load_user_exercises_chart_repository_error');
    exercisesChartsRepository.loadExercisesCharts.mockRejectedValueOnce(error);

    const response = await sut.handle(request);

    expect(response).toEqual({
      data: new ServerError(error),
      statusCode: 500,
    });
  });

  it('Should return 204 if LoadGymExercisesRepository returns an empty list', async () => {
    exercisesChartsRepository.loadExercisesCharts.mockResolvedValueOnce([]);

    const response = await sut.handle(request);

    expect(response).toEqual({
      data: null,
      statusCode: 204,
    });
  });

  it('Should return 200 on success', async () => {
    const response = await sut.handle(request);

    expect(response).toEqual({
      data: [
        {
          id: 'any_exercises_chart_id_1',
          userId: 'any_user_id_1',
          goals: 'any_goal_1',
          observation: 'any_observation',
          divisions: [
            { name: 'any_division_1', weekDays: [0, 1] },
            { name: 'any_division_2', weekDays: [2, 3] },
          ],
          exercises: [
            { exerciseId: 'any_exercise_id_1', series: 4, repts: 12, weight: 20, division: 'any_division_1' },
            { exerciseId: 'any_exercise_id_2', series: 3, repts: 10, weight: 30, division: 'any_division_2' },
          ],
        },
        {
          id: 'any_exercises_chart_id_2',
          userId: 'any_user_id_1',
          goals: 'any_goal_2',
          divisions: [
            { name: 'any_division_1', weekDays: [0, 1] },
            { name: 'any_division_2', weekDays: [2, 3] },
          ],
          exercises: [
            { exerciseId: 'any_exercise_id_1', series: 4, repts: 12, weight: 20, division: 'any_division_1' },
            { exerciseId: 'any_exercise_id_2', series: 3, repts: 10, weight: 30, division: 'any_division_2' },
          ],
        },
      ],
      statusCode: 200,
    });
  });
});
