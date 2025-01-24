import type { Request, Response } from 'express';

import { getMockReq, getMockRes } from '@jest-mock/express';
import { type MockProxy, mock } from 'jest-mock-extended';

import type { Controller } from '@/application/controllers';
import { adaptExpressRoute } from '@/main/adapters';

describe('ExpressRouter', () => {
  let req: Request;
  let res: Response;
  let controller: MockProxy<Controller>;
  let sut: (req: Request, res: Response) => Promise<void>;

  beforeAll(() => {
    req = getMockReq({ body: { any: 'any' } });
    res = getMockRes().res;
    controller = mock();
    controller.handle.mockResolvedValue({
      data: { result: 'any' },
      statusCode: 200,
    });
  });

  beforeEach(() => {
    sut = adaptExpressRoute(controller);
  });

  it('Should call handle with correct data', async () => {
    await sut(req, res);

    expect(controller.handle).toHaveBeenCalledWith({ any: 'any' });
    expect(controller.handle).toHaveBeenCalledTimes(1);
  });

  it('Should respond with 200 and correct data', async () => {
    await sut(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ result: 'any' });
    expect(res.json).toHaveBeenCalledTimes(1);
  });
});
