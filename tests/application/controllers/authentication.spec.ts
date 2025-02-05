import { AuthenticationController, Controller } from '@/application/controllers';
import { RequiredParam, RequiredPattern, RequiredString } from '@/application/validation';

describe('AuthenticationController', () => {
  let sut: AuthenticationController;
  let authentication: jest.Mock;

  const request = {
    email: 'any_email@mail.com',
    password: 'any_password',
  };

  beforeAll(() => {
    authentication = jest.fn();
  });

  beforeEach(() => {
    sut = new AuthenticationController(authentication);
  });

  it('Should extend controller', () => {
    expect(sut).toBeInstanceOf(Controller);
  });

  it('Should build Validators correctly', () => {
    const validators = sut.buildValidators(request);

    expect(validators).toEqual([
      new RequiredParam(request, 'email'),
      new RequiredString(request.email, 'email'),
      new RequiredPattern(request.email, 'email', /^[\w.]+@\w+.\w{2,}(?:.\w{2})?$/gim),
      new RequiredParam(request, 'password'),
      new RequiredString(request.password, 'password'),
    ]);
  });

  it('Should call Authentication with correct input', async () => {
    await sut.handle(request);

    expect(authentication).toHaveBeenCalledWith(request);
    expect(authentication).toHaveBeenCalledTimes(1);
  });
});
