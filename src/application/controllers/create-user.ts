import { CreateUser } from '@/domain/usecases';
import { HttpResponse, badRequest, noContent, serverError } from '@/application/helpers';
import { RequiredParam, RequiredPattern, RequiredString, ValidationComposite } from '@/application/validation';

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

type Model = null | Error

export class CreateUserController {
  constructor(private readonly createUser: CreateUser) {}

  async perform(request: Request): Promise<HttpResponse<Model>> {
    try {
      const error = this.validate(request);
      if (error) {
        return badRequest(error);
      }
      await this.createUser(request);
      return noContent();
    } catch (error) {
      return serverError(error instanceof Error ? error : undefined);
    }
  }

  private validate(request: Request): Error | undefined {
    return new ValidationComposite([
      new RequiredParam(request, 'name'),
      new RequiredString(request.name, 'name'),
      new RequiredParam(request, 'email'),
      new RequiredString(request.email, 'email'),
      new RequiredPattern(request.email, 'email', /^[\w.]+@\w+.\w{2,}(?:.\w{2})?$/gmi),
      new RequiredParam(request, 'password'),
      new RequiredString(request.password, 'password'),
      new RequiredParam(request, 'role'),
      new RequiredString(request.role, 'role'),
      new RequiredParam(request, 'contact'),
      new RequiredString(request.contact, 'contact'),
      new RequiredParam(request, 'address'),
      new RequiredParam(request.address, 'number', 'address'),
      new RequiredString(request.address.number, 'number'),
      new RequiredParam(request, 'address'),
      new RequiredParam(request.address, 'street', 'address'),
      new RequiredString(request.address.street, 'street'),
      new RequiredParam(request, 'address'),
      new RequiredParam(request.address, 'neighborhood', 'address'),
      new RequiredString(request.address.neighborhood, 'neighborhood'),
      new RequiredParam(request, 'address'),
      new RequiredParam(request.address, 'city', 'address'),
      new RequiredString(request.address.city, 'city'),
      new RequiredParam(request, 'address'),
      new RequiredParam(request.address, 'state', 'address'),
      new RequiredString(request.address.state, 'state'),
      new RequiredParam(request, 'address'),
      new RequiredParam(request.address, 'postalCode', 'address'),
      new RequiredString(request.address.postalCode, 'postalCode'),
      new RequiredPattern(request.address.postalCode, 'postalCode', /^[0-9]{5}-[0-9]{3}$/),
    ]).validate();
  }
}
