import { AuthenticationController, Controller } from '@/application/controllers';
import { RequiredParam, RequiredPattern, RequiredString } from '@/application/validation';
import { InvalidCredentialsError } from '@/domain/errors';

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

  it('Should return 401 if Authentication throws InvalidCredentialsError', async () => {
    authentication.mockRejectedValueOnce(new InvalidCredentialsError());

    const response = await sut.handle(request);

    expect(response).toEqual({
      data: new InvalidCredentialsError(),
      statusCode: 401,
    });
  });
});
