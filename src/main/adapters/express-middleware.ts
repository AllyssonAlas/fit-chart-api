import type { RequestHandler } from 'express';

import type { Middleware } from '@/application/contracts';

type Adapter = (middleware: Middleware) => RequestHandler;

export const adaptExpressMiddleware: Adapter = (middleware) => {
  return async (req, res, next) => {
    const { data, statusCode } = await middleware.handle({ ...req.headers });
    if (statusCode === 200) {
      const validProps = Object.entries(data).filter((entry) => entry[1]);
      req.locals = { ...req.locals, ...Object.fromEntries(validProps) };
      next();
    } else {
      res.status(statusCode).json({ error: data.message });
    }
  };
};
