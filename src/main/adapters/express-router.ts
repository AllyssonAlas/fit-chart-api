import type { Request, Response } from 'express';

import type { Controller } from '@/application/controllers';

export const adaptExpressRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    controller.handle(req.body);
  };
};
