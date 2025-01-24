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
  });

  beforeEach(() => {
    sut = adaptExpressRoute(controller);
  });

  it('Should call handle with correct data', () => {
    sut(req, res);

    expect(controller.handle).toHaveBeenCalledWith({ any: 'any' });
    expect(controller.handle).toHaveBeenCalledTimes(1);
  });
});
