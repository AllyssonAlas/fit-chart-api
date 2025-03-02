import { Controller } from '@/application/controllers';
import { type HttpResponse, forbidden, noContent } from '@/application/helpers';
import { ValidationBuilder as Builder, type Validator } from '@/application/validation';
import type { GymData } from '@/domain/entities';
import { EmailDoesNotExistError } from '@/domain/errors';
import type { CreateGym } from '@/domain/usecases';

type Request = GymData;

type Model = null | Error;

export class CreateGymController extends Controller {
  constructor(private readonly createGym: CreateGym) {
    super();
  }

  async perform(request: Request): Promise<HttpResponse<Model>> {
    try {
      await this.createGym(request);
      return noContent();
    } catch (error) {
      if (error instanceof EmailDoesNotExistError) {
        return forbidden(error);
      }
      throw error;
    }
  }

  override buildValidators(request: Request): Validator[] {
    // biome-ignore format: this array should not be formatted
    return [
        ...Builder.of(request)
          .field('name').string()
          .field('email').string().email()
          .field('contact').string()
          .field('ownerEmail').string().email()
          .field('administrators').optional().array().stringArray()
          .field('address')
          .build(),
        ...Builder.of(request.address)
          .subField('number', 'address').string()
          .subField('street', 'address').string()
          .subField('neighborhood', 'address').string()
          .subField('city', 'address').string()
          .subField('state', 'address').string().length(2)
          .subField('postalCode', 'address').string().postalCode()
          .build(),
      ];
  }
}
