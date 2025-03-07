import type { Router } from 'express';

import { adaptExpressRoute } from '@/main/adapters';
import { makeAuthenticationController, makeCreateUserController } from '@/main/factories/application/controllers';

export default (router: Router): void => {
  router.post('/user', adaptExpressRoute(makeCreateUserController()));
  router.post('/login', adaptExpressRoute(makeAuthenticationController()));
};
