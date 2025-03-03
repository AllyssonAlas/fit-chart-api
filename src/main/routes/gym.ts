import type { Router } from 'express';

import { adaptExpressMiddleware as adaptMiddleware, adaptExpressRoute as adaptRoute } from '@/main/adapters';
import { Permissions } from '@/main/enums';
import { makeCreateGymController } from '@/main/factories/application/controllers';
import { makeAuthorizationMiddleware } from '@/main/factories/application/middlewares';

const { CREATE_GYM } = Permissions;

export default (router: Router): void => {
  router.post('/gym', adaptMiddleware(makeAuthorizationMiddleware(CREATE_GYM)), adaptRoute(makeCreateGymController()));
};
