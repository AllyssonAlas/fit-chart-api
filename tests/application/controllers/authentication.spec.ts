import { AuthenticationController, Controller } from '@/application/controllers';

describe('AuthenticationController', () => {
  let sut: AuthenticationController;

  beforeEach(() => {
    sut = new AuthenticationController();
  });

  it('Should extend controller', () => {
    expect(sut).toBeInstanceOf(Controller);
  });
});
