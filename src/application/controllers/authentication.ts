import { Controller } from '@/application/controllers';
import { type HttpResponse, ok, unauthorized } from '@/application/helpers';
import { ValidationBuilder as Builder, type Validator } from '@/application/validation';
import { InvalidCredentialsError } from '@/domain/errors';
import type { Authentication } from '@/domain/usecases';

type Request = {
  email: string;
  password: string;
};

type Model =
  | {
      authToken: string;
      name: string;
      email: string;
    }
  | Error;

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
