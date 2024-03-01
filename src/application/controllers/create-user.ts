import { CreateUser } from '@/domain/usecases';
import { InvalidParamError, RequiredParamError, RequiredSubParamError, ServerError } from '@/application/errors';

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

  async perform(request: Request): Promise<any> {
    try {
      const requiredParams = ['name', 'email', 'password', 'role', 'contact', 'address'];
      for (const field of requiredParams) {
        if (!Object.keys(request).includes(field)) {
          return {
            statusCode: 400,
            body: new RequiredParamError(field),
          };
        }
      }
      const requiredAddressSubParams = ['number', 'street', 'neighborhood', 'city', 'state', 'postalCode'];
      for (const field of requiredAddressSubParams) {
        if (!Object.keys(request.address).includes(field)) {
          return {
            statusCode: 400,
            body: new RequiredSubParamError('address', field),
          };
        }
      }
      if (!(/^[0-9]{5}-[0-9]{3}$/).test(request.address.postalCode)) {
        return {
          statusCode: 400,
          body: new InvalidParamError('postalCode'),
        };
      }
      if (!(/^[\w.]+@\w+.\w{2,}(?:.\w{2})?$/gmi).test(request.email)) {
        return {
          statusCode: 400,
          body: new InvalidParamError('email'),
        };
      }
      await this.createUser(request);
      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError(error instanceof Error ? error : undefined),
      };
    }
  }
}
