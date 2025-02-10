import { UnauthorizedError } from '@/application/errors';
import { AuthorizationMiddleware } from '@/application/middlewares';

describe('AuthorizationMiddleware', () => {
  let sut: AuthorizationMiddleware;

  beforeEach(() => {
    sut = new AuthorizationMiddleware();
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
});
