import type { Router } from 'express';

import { bodyParser, contentType, cors } from '@/main/middlewares';

export const setupMiddlewares = (app: Router) => {
  app.use(bodyParser);
  app.use(cors);
  app.use(contentType);
};
