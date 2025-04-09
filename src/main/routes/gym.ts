import type { Router } from 'express';

import { adaptExpressMiddleware as adaptMiddleware, adaptExpressRoute as adaptRoute } from '@/main/adapters';
import { Permissions } from '@/main/enums';
import {
  makeAssignUsersToGymController,
  makeCreateGymController,
  makeListGymExercisesController,
} from '@/main/factories/application/controllers';
import { makeAuthorizationMiddleware } from '@/main/factories/application/middlewares';

const { CREATE_GYM, ASSiGN_USER_TO_GYM } = Permissions;

export default (router: Router): void => {
  router.post('/gym', adaptMiddleware(makeAuthorizationMiddleware(CREATE_GYM)), adaptRoute(makeCreateGymController()));
  router.put(
    '/gym/:gymId/assign',
    adaptMiddleware(makeAuthorizationMiddleware(ASSiGN_USER_TO_GYM)),
    adaptRoute(makeAssignUsersToGymController()),
  );
  router.get('/gym/:gymId/exercises', adaptRoute(makeListGymExercisesController()));
};
