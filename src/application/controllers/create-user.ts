import { CreateUser } from '@/domain/usecases';
import { HttpResponse, badRequest, noContent, serverError } from '@/application/helpers';
import { ValidationBuilder as Builder, ValidationComposite } from '@/application/validation';

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
      ...Builder.of({ value: request, fieldName: 'name' }).required().string().build(),
      ...Builder.of({ value: request, fieldName: 'email' }).required().string().email().build(),
      ...Builder.of({ value: request, fieldName: 'password' }).required().string().build(),
      ...Builder.of({ value: request, fieldName: 'role' }).required().string().build(),
      ...Builder.of({ value: request, fieldName: 'contact' }).required().string().build(),
      ...Builder.of({ value: request, fieldName: 'address' }).required().build(),
      ...Builder.of({ value: request.address, fieldName: 'number' }).required('address').string().build(),
      ...Builder.of({ value: request.address, fieldName: 'street' }).required('address').string().build(),
      ...Builder.of({ value: request.address, fieldName: 'neighborhood' }).required('address').string().build(),
      ...Builder.of({ value: request.address, fieldName: 'city' }).required('address').string().build(),
      ...Builder.of({ value: request.address, fieldName: 'state' }).required('address').string().build(),
      ...Builder.of({ value: request.address, fieldName: 'postalCode' }).required('address').string().postalCode().build(),
    ]).validate();
  }
}
