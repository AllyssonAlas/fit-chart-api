import { Controller } from '@/application/controllers';
import { type HttpResponse, forbidden, ok } from '@/application/helpers';
import { ValidationBuilder as Builder, type Validator } from '@/application/validation';
import type { AuthedUser, User } from '@/domain/entities';
import { EmailAlreadyExistsError, NonexistentRoleError } from '@/domain/errors';
import type { Authentication, CreateUser } from '@/domain/usecases';

type Request = User;

type Model = AuthedUser | Error;

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
      const authedUser = await this.authentication({ email: request.email, password: request.password });
      return ok(authedUser);
    } catch (error) {
      const usecaseError = [EmailAlreadyExistsError, NonexistentRoleError].find((errType) => error instanceof errType);
      if (usecaseError) return forbidden(new usecaseError());
      throw error;
    }
  }

  override buildValidators(request: any): Validator[] {
    // biome-ignore format: this array should not be formatted
    return [
      ...Builder.of(request)
        .field('name').string()
        .field('email').string().email()
        .field('password').string()
        .field('role').string()
        .field('contact').string()
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
