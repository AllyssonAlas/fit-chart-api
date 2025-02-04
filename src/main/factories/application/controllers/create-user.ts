import { CreateUserController } from '@/application/controllers';
import { makeAuthenticationUsecase, makeCreateUserUsecase } from '@/main/factories/domain/usecases';

export const makeCreateUserController = (): CreateUserController => {
  return new CreateUserController(makeCreateUserUsecase(), makeAuthenticationUsecase());
};
