import { getMockReq, getMockRes } from '@jest-mock/express';
import type { Request, Response } from 'express';
import { type MockProxy, mock } from 'jest-mock-extended';

import type { Middleware } from '@/application/contracts';
import { adaptExpressMiddleware } from '@/main/adapters';

describe('ExpressMiddleware', () => {
  let sut: any;
  let middleware: MockProxy<Middleware>;
  let req: Request;
  let res: Response;

  const requestHeaders = { any: 'any' };

  beforeAll(() => {
    req = getMockReq({ headers: requestHeaders });
    res = getMockRes().res;
    middleware = mock();
    middleware.handle.mockResolvedValue({
      statusCode: 200,
      data: {
        emptyProp: '',
        nullProp: null,
        undefinedProp: undefined,
        prop: 'any_value',
      },
    });
  });

  beforeEach(() => {
    sut = adaptExpressMiddleware(middleware);
  });

  it('Should call handle with correct request', async () => {
    await sut(req, res);

    expect(middleware.handle).toHaveBeenCalledWith(requestHeaders);
    expect(middleware.handle).toHaveBeenCalledTimes(1);
  });

  it('Should call handle with empty request', async () => {
    req = getMockReq();

    await sut(req, res);

    expect(middleware.handle).toHaveBeenCalledWith({});
    expect(middleware.handle).toHaveBeenCalledTimes(1);
  });

  it('Should respond with correct error and statusCode', async () => {
    const error = new Error('any_error');
    middleware.handle.mockResolvedValueOnce({ statusCode: 500, data: error });

    await sut(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
    expect(res.json).toHaveBeenCalledTimes(1);
  });
});
