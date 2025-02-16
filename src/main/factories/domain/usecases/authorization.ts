import { type Authorization, setupAuthorization } from '@/domain/usecases';
import { makeJwtAdapter } from '@/main/factories/infra/gateways';

export const makeAuthorizationUsecase = (): Authorization => {
  return setupAuthorization(makeJwtAdapter());
};
