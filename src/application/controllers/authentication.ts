import { Controller } from '@/application/controllers';
import { ValidationBuilder as Builder, type Validator } from '@/application/validation';
import type { Authentication } from '@/domain/usecases';

type Request = {
  email: string;
  password: string;
};

export class AuthenticationController extends Controller {
  constructor(private readonly authentication: Authentication) {
    super();
  }

  async perform(request: Request): Promise<any> {
    await this.authentication(request);
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
