import { AuthorizationMiddleware } from '@/application/middlewares';
import { makeAuthorizationUsecase } from '@/main/factories/domain/usecases';

export const makeAuthorizationMiddleware = (permission: string): AuthorizationMiddleware => {
  return new AuthorizationMiddleware(makeAuthorizationUsecase(), permission);
};
