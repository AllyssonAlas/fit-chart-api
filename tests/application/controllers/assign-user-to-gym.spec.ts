import { AssignUserToGymController, Controller } from '@/application/controllers';

jest.mock('@/application/validation/composite');

describe('AssignUserToGymController', () => {
  let sut: AssignUserToGymController;

  beforeEach(() => {
    sut = new AssignUserToGymController();
  });

  it('Should extend controller', () => {
    expect(sut).toBeInstanceOf(Controller);
  });
});
