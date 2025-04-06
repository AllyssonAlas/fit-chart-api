import { Controller } from '@/application/controllers';
import { noContent } from '@/application/helpers';
import type { LoadGymExercisesRepository } from '@/domain/contracts/repositories';

type Request = {
  gymId: string;
};

export class ListGymExercisesController extends Controller {
  constructor(private readonly gymRepository: LoadGymExercisesRepository) {
    super();
  }

  async perform(request: Request): Promise<any> {
    await this.gymRepository.loadExercises(request);
    return noContent();
  }
}
