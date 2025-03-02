import { Controller, CreateGymController } from '@/application/controllers';

describe('CreateGymController', () => {
  let sut: CreateGymController;

  beforeEach(() => {
    sut = new CreateGymController();
  });

  it('Should extend controller', () => {
    expect(sut).toBeInstanceOf(Controller);
  });
});
