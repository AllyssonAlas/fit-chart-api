import { Controller } from '@/application/controllers';
import { ValidationBuilder as Builder, type Validator } from '@/application/validation';
import type { SaveExercisesChartRepository } from '@/domain/contracts/repositories';

type Request = SaveExercisesChartRepository.Input;

export class CreateExercisesChartController extends Controller {
  constructor(private readonly exercisesRepository: SaveExercisesChartRepository) {
    super();
  }

  async perform(request: Request): Promise<any> {
    await this.exercisesRepository.saveExercisesChart(request);
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
