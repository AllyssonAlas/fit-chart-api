import { Controller } from '@/application/controllers';
import { type HttpResponse, noContent, ok } from '@/application/helpers';
import type { ExercisesChart } from '@/domain/entities/generic-types';
import type { LoadUserActiveExercisesChart } from '@/domain/usecases';

type Request = {
  userId: string;
};

type Model = ExercisesChart | null;

export class LoadUserActiveExercisesChartController extends Controller {
  constructor(private readonly loadUserActiveExercisesChart: LoadUserActiveExercisesChart) {
    super();
  }

  async perform(request: Request): Promise<HttpResponse<Model>> {
    const result = await this.loadUserActiveExercisesChart(request);
    return result ? ok(result) : noContent();
  }
}
