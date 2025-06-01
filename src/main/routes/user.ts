import type { Router } from 'express';

import { adaptExpressRoute } from '@/main/adapters';
import { Roles } from '@/main/enums';
import { makeAuthenticationController } from '@/main/factories/application/controllers';
import { makeForbidRoleCreationDecorator } from '@/main/factories/main/decorators';

export default (router: Router): void => {
  router.post('/user', adaptExpressRoute(makeForbidRoleCreationDecorator([Roles.ADMIN])));
  router.post('/login', adaptExpressRoute(makeAuthenticationController()));
};
