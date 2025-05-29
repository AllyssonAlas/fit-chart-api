import { Controller, CreateExercisesChartController } from '@/application/controllers';
import {
  RequiredArray,
  RequiredNumber,
  RequiredNumberArray,
  RequiredParam,
  RequiredString,
} from '@/application/validation';

describe('CreateExercisesChartController', () => {
  const request = {
    userId: 'any_user_id',
    goals: 'any_goal',
    observation: 'any_observation',
    divisions: [
      { name: 'any_division_1', weekDays: [0, 2] },
      { name: 'any_division_2', weekDays: [1, 3] },
    ],
    exercises: [
      { exerciseId: 'any_exercise_id_1', series: 4, repts: 12, weight: 20, division: 'any_division_1' },
      { exerciseId: 'any_exercise_id_2', series: 3, repts: 10, weight: 30, division: 'any_division_2' },
    ],
  };

  let sut: CreateExercisesChartController;

  beforeEach(() => {
    sut = new CreateExercisesChartController();
  });

  it('Should extend controller', () => {
    expect(sut).toBeInstanceOf(Controller);
  });

  it('Should build Validators correctly', () => {
    const validators = sut.buildValidators(request);

    expect(validators).toEqual([
      new RequiredParam(request, 'userId'),
      new RequiredString(request.userId, 'userId'),
      new RequiredParam(request, 'goals'),
      new RequiredString(request.goals, 'goals'),
      new RequiredParam(request, 'observation'),
      new RequiredString(request.observation, 'observation'),
      new RequiredParam(request, 'divisions'),
      new RequiredArray(request.divisions, 'divisions'),
      new RequiredParam(request, 'exercises'),
      new RequiredArray(request.exercises, 'exercises'),
      new RequiredParam(request.divisions[0], 'name', 'divisions'),
      new RequiredString(request.divisions[0].name, 'name'),
      new RequiredParam(request.divisions[0], 'weekDays', 'divisions'),
      new RequiredArray(request.divisions[0].weekDays, 'weekDays'),
      new RequiredNumberArray(request.divisions[0].weekDays, 'weekDays'),
      new RequiredParam(request.divisions[1], 'name', 'divisions'),
      new RequiredString(request.divisions[1].name, 'name'),
      new RequiredParam(request.divisions[1], 'weekDays', 'divisions'),
      new RequiredArray(request.divisions[1].weekDays, 'weekDays'),
      new RequiredNumberArray(request.divisions[1].weekDays, 'weekDays'),
      new RequiredParam(request.exercises[0], 'exerciseId', 'exercises'),
      new RequiredString(request.exercises[0].exerciseId, 'exerciseId'),
      new RequiredParam(request.exercises[0], 'series', 'exercises'),
      new RequiredNumber(request.exercises[0].series, 'series'),
      new RequiredParam(request.exercises[0], 'repts', 'exercises'),
      new RequiredNumber(request.exercises[0].repts, 'repts'),
      new RequiredParam(request.exercises[0], 'weight', 'exercises'),
      new RequiredNumber(request.exercises[0].weight, 'weight'),
      new RequiredParam(request.exercises[0], 'division', 'exercises'),
      new RequiredString(request.exercises[0].division, 'division'),
      new RequiredParam(request.exercises[1], 'exerciseId', 'exercises'),
      new RequiredString(request.exercises[1].exerciseId, 'exerciseId'),
      new RequiredParam(request.exercises[1], 'series', 'exercises'),
      new RequiredNumber(request.exercises[1].series, 'series'),
      new RequiredParam(request.exercises[1], 'repts', 'exercises'),
      new RequiredNumber(request.exercises[1].repts, 'repts'),
      new RequiredParam(request.exercises[1], 'weight', 'exercises'),
      new RequiredNumber(request.exercises[1].weight, 'weight'),
      new RequiredParam(request.exercises[1], 'division', 'exercises'),
      new RequiredString(request.exercises[1].division, 'division'),
    ]);
  });
});
