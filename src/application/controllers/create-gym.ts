import { Controller } from '@/application/controllers';
import { ValidationBuilder as Builder, type Validator } from '@/application/validation';

export class CreateGymController extends Controller {
  async perform(): Promise<any> {}

  override buildValidators(request: any): Validator[] {
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
