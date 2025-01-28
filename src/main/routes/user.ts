import type { Router } from 'express';

import { adaptExpressRoute } from '@/main/adapters';
import { makeCreateUserController } from '@/main/factories/application/controllers';

export default (router: Router): void => {
  router.post('/user/create', adaptExpressRoute(makeCreateUserController()));
};
