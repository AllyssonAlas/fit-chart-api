import { CreateUser } from '@/domain/usecases';

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
      const requiredFields = ['name', 'email', 'password', 'role', 'contact', 'address'];
      for (const field of requiredFields) {
        if (!Object.keys(request).includes(field)) {
          return {
            statusCode: 400,
            body: new Error(`Field ${field} is required`),
          };
        }
      }
      const requiredAddressSubfields = ['number', 'street', 'neighborhood', 'city', 'state', 'postalCode'];
      for (const field of requiredAddressSubfields) {
        if (!Object.keys(request.address).includes(field)) {
          return {
            statusCode: 400,
            body: new Error(`Subfield ${field} of field address is required`),
          };
        }
      }
      if (!(/^[0-9]{5}-[0-9]{3}$/).test(request.address.postalCode)) {
        return {
          statusCode: 400,
          body: new Error('Field postalCode is invalid'),
        };
      }
      if (!(/^[\w.]+@\w+.\w{2,}(?:.\w{2})?$/gmi).test(request.email)) {
        return {
          statusCode: 400,
          body: new Error('Field email is invalid'),
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
        body: error,
      };
    }
  }
}
