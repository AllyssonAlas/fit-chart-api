import { Controller } from '@/application/controllers';
import { ValidationBuilder as Builder, type Validator } from '@/application/validation';
import type { AssignUsersToGym } from '@/domain/usecases';

type Request = { gymId: string; usersType: string; usersEmails: string[] };

export class AssignUserToGymController extends Controller {
  constructor(private readonly assignUsersToGym: AssignUsersToGym) {
    super();
  }

  async perform(request: Request): Promise<any> {
    await this.assignUsersToGym(request);
  }

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
