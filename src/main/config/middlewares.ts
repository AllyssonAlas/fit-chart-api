import type { Router } from 'express';

import { bodyParser } from '@/main/middlewares';

export const setupMiddlewares = (app: Router) => {
  app.use(bodyParser);
};
