import { Controller } from '@/application/controllers';
import { ValidationBuilder as Builder, type Validator } from '@/application/validation';

export class AssignUserToGymController extends Controller {
  async perform(): Promise<any> {}

  override buildValidators(request: any): Validator[] {
    // biome-ignore format: this array should not be formatted
    return [
      ...Builder.of(request)
      .field('gymId').string()
      .field('usersEmails').array().stringArray()
      .field('usersType').string()
      .build(),
    ];
  }
}
