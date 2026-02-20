import { Controller, LoadUserActiveExercisesChartController } from '@/application/controllers';

describe('LoadUserActiveExercisesChartController', () => {
  let sut: LoadUserActiveExercisesChartController;

  beforeEach(() => {
    sut = new LoadUserActiveExercisesChartController();
  });

  it('Should extend controller', () => {
    expect(sut).toBeInstanceOf(Controller);
  });
});
