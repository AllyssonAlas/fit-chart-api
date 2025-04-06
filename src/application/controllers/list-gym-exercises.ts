import { Controller } from '@/application/controllers';
import { type HttpResponse, noContent, ok } from '@/application/helpers';
import type { LoadGymExercisesRepository } from '@/domain/contracts/repositories';

type Request = {
  gymId: string;
};

type Model = LoadGymExercisesRepository.Output | null;

export class ListGymExercisesController extends Controller {
  constructor(private readonly gymRepository: LoadGymExercisesRepository) {
    super();
  }

  async perform(request: Request): Promise<HttpResponse<Model>> {
    const result = await this.gymRepository.loadExercises(request);
    return result.length ? ok(result) : noContent();
  }
}
