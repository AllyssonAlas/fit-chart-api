import { AuthenticationController } from '@/application/controllers';
import { makeAuthenticationUsecase } from '@/main/factories/domain/usecases';

export const makeAuthenticationController = (): AuthenticationController => {
  return new AuthenticationController(makeAuthenticationUsecase());
};
