import { Controller } from '@/application/controllers';
import { type HttpResponse, noContent } from '@/application/helpers';
import { ValidationBuilder as Builder, type Validator } from '@/application/validation';
import type { RawExercisesChart } from '@/domain/entities/generic-types';
import type { CreateExercisesChart } from '@/domain/usecases';

type Request = RawExercisesChart;

type Model = null | Error;

export class CreateExercisesChartController extends Controller {
  constructor(private readonly createExercisesChart: CreateExercisesChart) {
    super();
  }

  async perform(request: Request): Promise<HttpResponse<Model>> {
    await this.createExercisesChart(request);
    return noContent();
  }

  override buildValidators(request: Request): Validator[] {
    // biome-ignore format: this array should not be formatted
    return [
      ...Builder.of(request)
        .field('userId').string()
        .field('goals').string()
        .field('observation').string().optional()
        .field('divisions').array()
        .field('exercises').array()
        .build(),
      ...request.divisions.flatMap((_, index) => [
        ...Builder.of(request.divisions[index])
          .subField('name', 'divisions').string()
          .subField('weekDays', 'divisions').array().numberArray().build(),
      ]),
        ...request.exercises.flatMap((_, index) => [
        ...Builder.of(request.exercises[index])
          .subField('exerciseId', 'exercises').string()
          .subField('series', 'exercises').number()
          .subField('repts', 'exercises').number()
          .subField('weight', 'exercises').number()
          .subField('division', 'exercises').string().build(),
      ]),
    ];
  }
}
