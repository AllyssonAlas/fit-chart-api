import { Controller } from '@/application/controllers';
import { type HttpResponse, forbidden, noContent } from '@/application/helpers';
import { ValidationBuilder as Builder, type Validator } from '@/application/validation';
import { EmailAlreadyExistsError, NonexistentRoleError } from '@/domain/errors';
import type { Authentication, CreateUser } from '@/domain/usecases';

type Request = {
  name: string;
  email: string;
  password: string;
  role: string;
  contact: string;
  address: {
    number: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    complement: string | null;
  };
};

type Model = null | Error;

export class CreateUserController extends Controller {
  constructor(
    private readonly createUser: CreateUser,
    private readonly authentication: Authentication,
  ) {
    super();
  }

  async perform(request: Request): Promise<HttpResponse<Model>> {
    try {
      await this.createUser(request);
      await this.authentication({ email: request.email, password: request.password });
      return noContent();
    } catch (error) {
      const errors: Error[] = [new EmailAlreadyExistsError(), new NonexistentRoleError()];
      const findError = errors.find(({ name }) => error instanceof Error && error.name === name);
      if (findError) return forbidden(findError);
      throw error;
    }
  }

  override buildValidators(request: any): Validator[] {
    // biome-ignore format: this array should not be formatted
    return [
      ...Builder.of(request)
        .field('name').required().string()
        .field('email').required().string().email()
        .field('password').required().string()
        .field('role').required().string()
        .field('contact').required().string()
        .field('address').required()
        .build(),
      ...Builder.of(request.address)
        .field('number').required('address').string()
        .field('street').required('address').string()
        .field('neighborhood').required('address').string()
        .field('city').required('address').string()
        .field('state').required('address').string().length(2)
        .field('postalCode').required('address').string().postalCode()
        .build(),
    ];
  }
}
