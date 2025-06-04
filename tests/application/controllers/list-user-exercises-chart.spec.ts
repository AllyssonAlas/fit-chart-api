import { Controller, ListUserExercisesChartsController } from '@/application/controllers';

describe('ListUserExercisesChartsController', () => {
  let sut: ListUserExercisesChartsController;

  beforeEach(() => {
    sut = new ListUserExercisesChartsController();
  });

  it('Should extend controller', () => {
    expect(sut).toBeInstanceOf(Controller);
  });
});
