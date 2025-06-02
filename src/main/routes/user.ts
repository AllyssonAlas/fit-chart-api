import type { Router } from 'express';

import { adaptExpressMiddleware, adaptExpressRoute } from '@/main/adapters';
import { Permissions, Roles } from '@/main/enums';
import {
  makeAuthenticationController,
  makeCreateExercisesChartController,
} from '@/main/factories/application/controllers';
import { makeAuthorizationMiddleware } from '@/main/factories/application/middlewares';
import { makeForbidRoleCreationDecorator } from '@/main/factories/main/decorators';

const { CREATE_EXERCISES_CHART } = Permissions;

export default (router: Router): void => {
  router.post('/user', adaptExpressRoute(makeForbidRoleCreationDecorator([Roles.ADMIN])));
  router.post('/login', adaptExpressRoute(makeAuthenticationController()));
  router.post(
    '/user/:userId/exercisesChart',
    adaptExpressMiddleware(makeAuthorizationMiddleware(CREATE_EXERCISES_CHART)),
    adaptExpressRoute(makeCreateExercisesChartController()),
  );
};
