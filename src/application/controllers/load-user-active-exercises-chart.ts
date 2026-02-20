import { Controller } from '@/application/controllers';
import { type HttpResponse, noContent } from '@/application/helpers';

export class LoadUserActiveExercisesChartController extends Controller {
  async perform(): Promise<HttpResponse<null>> {
    return noContent();
  }
}
