import { ForbiddenError, UnauthorizedError } from '@/application/errors';
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

  it('Should return 403 if Authorization throws', async () => {
    authorize.mockRejectedValueOnce(new Error('any_error'));

    const httpResponse = await sut.handle(request);

    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError(),
    });
  });

  it('Should return 200 with correct data on success', async () => {
    const httpResponse = await sut.handle(request);

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { userId: 'any_user_id' },
    });
  });
});
