import { Controller } from '@/application/controllers';

type Request = {
  userId: string;
};

export class ListUserExercisesChartsController extends Controller {
  async perform(request: Request): Promise<any> {}
}
