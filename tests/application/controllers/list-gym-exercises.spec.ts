import { Controller, ListGymExercisesController } from '@/application/controllers';

describe('ListGymExercisesController', () => {
  let sut: ListGymExercisesController;

  beforeEach(() => {
    sut = new ListGymExercisesController();
  });

  it('Should extend controller', () => {
    expect(sut).toBeInstanceOf(Controller);
  });
});
