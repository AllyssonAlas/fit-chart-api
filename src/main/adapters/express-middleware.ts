import type { RequestHandler } from 'express';

import type { Middleware } from '@/application/contracts';

export const adaptExpressMiddleware = (middleware: Middleware): RequestHandler => {
  return async (req) => {
    await middleware.handle({ ...req.headers });
  };
};
