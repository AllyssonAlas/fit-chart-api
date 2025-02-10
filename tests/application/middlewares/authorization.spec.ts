import { UnauthorizedError } from '@/application/errors';
import { AuthorizationMiddleware } from '@/application/middlewares';

describe('AuthorizationMiddleware', () => {
  let sut: AuthorizationMiddleware;
  let authorize: jest.Mock;
  let request: {
    authorization: string;
  };

  const requiredPermission = 'any_required_permission';

  beforeAll(() => {
    request = {
      authorization: 'any_authorization_token',
    };
    authorize = jest.fn().mockResolvedValue({ userId: 'any_user_id' });
  });

  beforeEach(() => {
    sut = new AuthorizationMiddleware(authorize, requiredPermission);
  });

  it('Should return 401 if authorization is not provided', async () => {
    const httpResponse = await sut.handle({} as any);

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError(),
    });
  });

  it('Should return 401 if authorization is empty', async () => {
    const httpResponse = await sut.handle({ authorization: '' });

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError(),
    });
  });

  it('Should return 401 if authorization is null', async () => {
    const httpResponse = await sut.handle({ authorization: null as any });

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError(),
    });
  });

  it('Should return 401 if authorization is undefined', async () => {
    const httpResponse = await sut.handle({ authorization: undefined as any });

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError(),
    });
  });

  it('Should call Authorization with correct input', async () => {
    await sut.handle(request);

    expect(authorize).toHaveBeenCalledWith({ authToken: request.authorization, requiredPermission });
    expect(authorize).toHaveBeenCalledTimes(1);
  });
});
