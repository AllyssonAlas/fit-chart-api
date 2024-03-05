import { CreateUserController } from '@/application/controllers';
import { ServerError } from '@/application/errors';
import { RequiredParam, RequiredPattern, RequiredString, ValidatorComposite } from '@/application/validation';

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
  it('Should return 400 if ValidationComposite returns an error', async () => {
    const error = new Error('validation_error');
    const ValidatorCompositeSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(error),
    }));
    jest.mocked(ValidatorComposite).mockImplementationOnce(ValidatorCompositeSpy);

    const response = await sut.perform(request);

    expect(ValidatorComposite).toHaveBeenCalledWith([
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
    ]);
    expect(response).toEqual({ data: error, statusCode: 400 });
  });

  it('Should call CreateUser with correct input', async () => {
    await sut.perform(request);

    expect(createUser).toHaveBeenCalledWith(request);
    expect(createUser).toHaveBeenCalledTimes(1);
  });

  it('Should return 500 if CreateUser throws', async () => {
    const error = new Error('create_user_error');
    createUser.mockRejectedValueOnce(error);

    const response = await sut.perform(request);

    expect(response).toEqual({
      data: new ServerError(error),
      statusCode: 500,
    });
  });

  it('Should return 204 on success', async () => {
    const response = await sut.perform(request);

    expect(response).toEqual({
      data: null,
      statusCode: 204,
    });
  });
});
