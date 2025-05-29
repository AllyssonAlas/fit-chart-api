import { Controller, CreateExercisesChartController } from '@/application/controllers';

describe('CreateExercisesChartController', () => {
  let sut: CreateExercisesChartController;

  beforeEach(() => {
    sut = new CreateExercisesChartController();
  });

  it('Should extend controller', () => {
    expect(sut).toBeInstanceOf(Controller);
  });
});
