import { CreateUser } from '@/domain/usecases';
import { HttpResponse, badRequest, noContent, serverError } from '@/application/helpers';
import { InvalidParamError, RequiredParamError, RequiredSubParamError } from '@/application/errors';

type Request = {
  name: string;
  email: string;
  password: string;
  role: string;
  contact: string;
  address: {
    number: string
    street: string
    neighborhood: string
    city: string
    state: string
    postalCode: string
    complement?: string
  };
};

export class CreateUserController {
  constructor(private readonly createUser: CreateUser) {}

  async perform(request: Request): Promise<HttpResponse> {
    try {
      const requiredParams = ['name', 'email', 'password', 'role', 'contact', 'address'];
      for (const field of requiredParams) {
        if (!Object.keys(request).includes(field)) {
          return badRequest(new RequiredParamError(field));
        }
      }
      const requiredAddressSubParams = ['number', 'street', 'neighborhood', 'city', 'state', 'postalCode'];
      for (const field of requiredAddressSubParams) {
        if (!Object.keys(request.address).includes(field)) {
          return badRequest(new RequiredSubParamError('address', field));
        }
      }
      if (!(/^[0-9]{5}-[0-9]{3}$/).test(request.address.postalCode)) {
        return badRequest(new InvalidParamError('postalCode'));
      }
      if (!(/^[\w.]+@\w+.\w{2,}(?:.\w{2})?$/gmi).test(request.email)) {
        return badRequest(new InvalidParamError('email'));
      }
      await this.createUser(request);
      return noContent();
    } catch (error) {
      return serverError(error instanceof Error ? error : undefined);
    }
  }
}
