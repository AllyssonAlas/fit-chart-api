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
    const { of } = Builder;
    return new ValidationComposite([
      ...of(request, 'name').required().string().build(),
      ...of(request, 'email').required().string().email().build(),
      ...of(request, 'password').required().string().build(),
      ...of(request, 'role').required().string().build(),
      ...of(request, 'contact').required().string().build(),
      ...of(request, 'address').required().build(),
      ...of(request.address, 'number').required('address').string().build(),
      ...of(request.address, 'street').required('address').string().build(),
      ...of(request.address, 'neighborhood').required('address').string().build(),
      ...of(request.address, 'city').required('address').string().build(),
      ...of(request.address, 'state').required('address').string().build(),
      ...of(request.address, 'postalCode').required('address').string().postalCode().build(),
    ]).validate();
  }
}
