import { Controller } from '@/application/controllers';
import { ValidationBuilder as Builder, type Validator } from '@/application/validation';

export class AuthenticationController extends Controller {
  async perform(): Promise<any> {}

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
