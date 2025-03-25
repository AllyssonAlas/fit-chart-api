import { Controller } from '@/application/controllers';
import { type HttpResponse, forbidden, noContent, notFound } from '@/application/helpers';
import { ValidationBuilder as Builder, type Validator } from '@/application/validation';
import { EmailDoesNotExistError, GymNotFoundError } from '@/domain/errors';
import type { AssignUsersToGym } from '@/domain/usecases';

type Request = { gymId: string; usersType: string; usersEmails: string[] };

type Model = null | Error;

export class AssignUserToGymController extends Controller {
  constructor(private readonly assignUsersToGym: AssignUsersToGym) {
    super();
  }

  async perform(request: Request): Promise<HttpResponse<Model>> {
    try {
      await this.assignUsersToGym(request);
      return noContent();
    } catch (error) {
      if (error instanceof GymNotFoundError) {
        return notFound(error);
      }
      if (error instanceof EmailDoesNotExistError) {
        return forbidden(error);
      }
      throw error;
    }
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
