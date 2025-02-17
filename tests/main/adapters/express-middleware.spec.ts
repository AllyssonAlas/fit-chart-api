import { getMockReq } from '@jest-mock/express';
import type { Request } from 'express';
import { type MockProxy, mock } from 'jest-mock-extended';

import type { Middleware } from '@/application/contracts';
import { adaptExpressMiddleware } from '@/main/adapters';

describe('ExpressMiddleware', () => {
  let sut: any;
  let middleware: MockProxy<Middleware>;
  let req: Request;

  const requestHeaders = { any: 'any' };

  beforeAll(() => {
    req = getMockReq({ headers: requestHeaders });
    middleware = mock();
  });

  beforeEach(() => {
    sut = adaptExpressMiddleware(middleware);
  });

  it('Should call handle with correct request', async () => {
    await sut(req);

    expect(middleware.handle).toHaveBeenCalledWith(requestHeaders);
    expect(middleware.handle).toHaveBeenCalledTimes(1);
  });

  it('Should call handle with empty request', async () => {
    req = getMockReq();

    await sut(req);

    expect(middleware.handle).toHaveBeenCalledWith({});
    expect(middleware.handle).toHaveBeenCalledTimes(1);
  });
});
