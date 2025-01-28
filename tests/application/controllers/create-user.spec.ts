import { CreateUserController } from '@/application/controllers';
import { ServerError } from '@/application/errors';
import { RequiredLength, RequiredParam, RequiredPattern, RequiredString } from '@/application/validation';
import { EmailAlreadyExistsError } from '@/domain/errors';

jest.mock('@/application/validation/composite');

describe('CreateUserController', () => {
  const request = {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    role: 'any_role_name',
    contact: 'any_contact',
    address: {
      city: 'any_city',
      neighborhood: 'any_neighborhood',
      number: 'any_number',
      postalCode: '00000-000',
      state: 'any_state',
      street: 'any_street',
      complement: 'any_complement',
    },
  };

  let sut: CreateUserController;
  let createUser: jest.Mock;

  beforeAll(() => {
    createUser = jest.fn();
  });

  beforeEach(() => {
    sut = new CreateUserController(createUser);
  });

  it('Should build Validators correctly', () => {
    const validators = sut.buildValidators(request);

    expect(validators).toEqual([
      new RequiredParam(request, 'name'),
      new RequiredString(request.name, 'name'),
      new RequiredParam(request, 'email'),
      new RequiredString(request.email, 'email'),
      new RequiredPattern(request.email, 'email', /^[\w.]+@\w+.\w{2,}(?:.\w{2})?$/gim),
      new RequiredParam(request, 'password'),
      new RequiredString(request.password, 'password'),
      new RequiredParam(request, 'role'),
      new RequiredString(request.role, 'role'),
      new RequiredParam(request, 'contact'),
      new RequiredString(request.contact, 'contact'),
      new RequiredParam(request, 'address'),
      new RequiredParam(request.address, 'number', 'address'),
      new RequiredString(request.address.number, 'number'),
      new RequiredParam(request.address, 'street', 'address'),
      new RequiredString(request.address.street, 'street'),
      new RequiredParam(request.address, 'neighborhood', 'address'),
      new RequiredString(request.address.neighborhood, 'neighborhood'),
      new RequiredParam(request.address, 'city', 'address'),
      new RequiredString(request.address.city, 'city'),
      new RequiredParam(request.address, 'state', 'address'),
      new RequiredString(request.address.state, 'state'),
      new RequiredLength(request.address.state, 'state', 2),
      new RequiredParam(request.address, 'postalCode', 'address'),
      new RequiredString(request.address.postalCode, 'postalCode'),
      new RequiredPattern(request.address.postalCode, 'postalCode', /^[0-9]{5}-[0-9]{3}$/),
    ]);
  });

  it('Should call CreateUser with correct input', async () => {
    await sut.handle(request);

    expect(createUser).toHaveBeenCalledWith(request);
    expect(createUser).toHaveBeenCalledTimes(1);
  });

  it('Should return 403 on EmailAlreadyExistsError', async () => {
    createUser.mockRejectedValueOnce(new EmailAlreadyExistsError());

    const response = await sut.handle(request);

    expect(response).toEqual({
      data: new EmailAlreadyExistsError(),
      statusCode: 403,
    });
  });

  it('Should return 500 on infra error', async () => {
    const error = new Error('infra_error');
    createUser.mockRejectedValueOnce(error);

    const response = await sut.handle(request);

    expect(response).toEqual({
      data: new ServerError(error),
      statusCode: 500,
    });
  });

  it('Should return 204 on success', async () => {
    const response = await sut.handle(request);

    expect(response).toEqual({
      data: null,
      statusCode: 204,
    });
  });
});
