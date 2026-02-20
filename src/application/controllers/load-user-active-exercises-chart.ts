import { Controller } from '@/application/controllers';
import { type HttpResponse, noContent } from '@/application/helpers';
import type { LoadUserActiveExercisesChart } from '@/domain/usecases';

type Request = {
  userId: string;
};

export class LoadUserActiveExercisesChartController extends Controller {
  constructor(private readonly loadUserActiveExercisesChart: LoadUserActiveExercisesChart) {
    super();
  }

  async perform(request: Request): Promise<HttpResponse<null>> {
    await this.loadUserActiveExercisesChart(request);
    return noContent();
  }
}
