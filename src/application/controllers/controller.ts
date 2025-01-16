import { type HttpResponse, badRequest, serverError } from '@/application/helpers';
import { ValidationComposite, type Validator } from '@/application/validation';

export abstract class Controller {
  abstract perform(request: any): Promise<HttpResponse>;

  buildValidators(request: any): Validator[] {
    return [];
  }

  async handle(request: any): Promise<HttpResponse | any> {
    const error = this.validate(request);
    if (error) return badRequest(error);
    try {
      return await this.perform(request);
    } catch (error) {
      return serverError(error instanceof Error ? error : undefined);
    }
  }

  validate(request: any): Error | undefined {
    const validators = this.buildValidators(request);
    return new ValidationComposite(validators).validate();
  }
}
