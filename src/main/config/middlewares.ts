import type { Router } from 'express';

import { bodyParser, cors } from '@/main/middlewares';

export const setupMiddlewares = (app: Router) => {
  app.use(bodyParser);
  app.use(cors);
};
