import { Controller } from '@/application/controllers';
import { type HttpResponse, ok, unauthorized } from '@/application/helpers';
import { ValidationBuilder as Builder, type Validator } from '@/application/validation';
import type { AuthedUser, User } from '@/domain/entities';
import { InvalidCredentialsError } from '@/domain/errors';
import type { Authentication } from '@/domain/usecases';

type Request = Pick<User, 'email' | 'password'>;

type Model = AuthedUser | Error;

export class AuthenticationController extends Controller {
  constructor(private readonly authentication: Authentication) {
    super();
  }

  async perform(request: Request): Promise<HttpResponse<Model>> {
    try {
      const authedUser = await this.authentication(request);
      return ok(authedUser);
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return unauthorized(new InvalidCredentialsError());
      }
      throw error;
    }
  }

  override buildValidators(request: any): Validator[] {
    // biome-ignore format: this array should not be formatted
    return [
        ...Builder.of(request)
          .field('email').required().string().email()
          .field('password').required().string()
          .build(),
      ];
  }
}
