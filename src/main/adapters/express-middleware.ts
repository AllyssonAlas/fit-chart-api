import type { RequestHandler } from 'express';

import type { Middleware } from '@/application/contracts';

export const adaptExpressMiddleware = (middleware: Middleware): RequestHandler => {
  return async (req, res) => {
    const { data, statusCode } = await middleware.handle({ ...req.headers });
    res.status(statusCode).json({ error: data.message });
  };
};
