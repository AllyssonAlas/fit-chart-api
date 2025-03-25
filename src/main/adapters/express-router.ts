import type { Request, Response } from 'express';

import type { Controller } from '@/application/controllers';

export const adaptExpressRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const { data, statusCode } = await controller.handle({ ...req.body, ...req.params });
    const json = [200, 204].includes(statusCode) ? data : { error: data.message };
    res.status(statusCode).json(json);
  };
};
