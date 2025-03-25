import { AssignUsersToGymController } from '@/application/controllers';
import { makeAssignUsersToGymUsecase } from '@/main/factories/domain/usecases';

export const makeAssignUsersToGymController = (): AssignUsersToGymController => {
  return new AssignUsersToGymController(makeAssignUsersToGymUsecase());
};
