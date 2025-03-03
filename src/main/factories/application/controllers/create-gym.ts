import { CreateGymController } from '@/application/controllers';
import { makeCreateGymUsecase } from '@/main/factories/domain/usecases';

export const makeCreateGymController = (): CreateGymController => {
  return new CreateGymController(makeCreateGymUsecase());
};
