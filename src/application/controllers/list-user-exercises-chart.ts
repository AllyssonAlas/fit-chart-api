import { Controller } from '@/application/controllers';
import { type HttpResponse, noContent, ok } from '@/application/helpers';
import type { LoadUserExercisesChartsRepository } from '@/domain/contracts/repositories';

type Request = {
  userId: string;
};

type Model = LoadUserExercisesChartsRepository.Output | null;

export class ListUserExercisesChartsController extends Controller {
  constructor(private readonly exercisesChartsRepository: LoadUserExercisesChartsRepository) {
    super();
  }

  async perform(request: Request): Promise<HttpResponse<Model>> {
    const result = await this.exercisesChartsRepository.loadExercisesCharts(request);
    return result.length ? ok(result) : noContent();
  }
}
