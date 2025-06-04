import { Controller } from '@/application/controllers';
import type { LoadUserExercisesChartsRepository } from '@/domain/contracts/repositories';

type Request = {
  userId: string;
};

export class ListUserExercisesChartsController extends Controller {
  constructor(private readonly exercisesChartsRepository: LoadUserExercisesChartsRepository) {
    super();
  }

  async perform(request: Request): Promise<any> {
    await this.exercisesChartsRepository.loadExercisesCharts(request);
  }
}
