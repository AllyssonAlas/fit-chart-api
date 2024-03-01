import { CreateUserController } from '@/application/controllers';
import { RequiredParamError, RequiredSubParamError, InvalidParamError, ServerError } from '@/application/errors';

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

  it('Should return 400 if field name is not provided', async () => {
    const { name, ...requestWithoutField } = request;

    const response = await sut.perform(requestWithoutField as any);

    expect(response).toEqual({
      data: new RequiredParamError('name'),
      statusCode: 400,
    });
  });

  it('Should return 400 if field email is not provided', async () => {
    const { email, ...requestWithoutField } = request;

    const response = await sut.perform(requestWithoutField as any);

    expect(response).toEqual({
      data: new RequiredParamError('email'),
      statusCode: 400,
    });
  });

  it('Should return 400 if field password is not provided', async () => {
    const { password, ...requestWithoutField } = request;

    const response = await sut.perform(requestWithoutField as any);

    expect(response).toEqual({
      data: new RequiredParamError('password'),
      statusCode: 400,
    });
  });

  it('Should return 400 if field role is not provided', async () => {
    const { role, ...requestWithoutField } = request;

    const response = await sut.perform(requestWithoutField as any);

    expect(response).toEqual({
      data: new RequiredParamError('role'),
      statusCode: 400,
    });
  });

  it('Should return 400 if field contact is not provided', async () => {
    const { contact, ...requestWithoutField } = request;

    const response = await sut.perform(requestWithoutField as any);

    expect(response).toEqual({
      data: new RequiredParamError('contact'),
      statusCode: 400,
    });
  });

  it('Should return 400 if field address is not provided', async () => {
    const { address, ...requestWithoutField } = request;

    const response = await sut.perform(requestWithoutField as any);

    expect(response).toEqual({
      data: new RequiredParamError('address'),
      statusCode: 400,
    });
  });

  it('Should return 400 if address sub param number is not provided', async () => {
    const { address: { number, ...addressWithouField }, ...requestWithoutField } = request;

    const response = await sut.perform({ ...requestWithoutField, address: addressWithouField } as any);

    expect(response).toEqual({
      data: new RequiredSubParamError('address', 'number'),
      statusCode: 400,
    });
  });

  it('Should return 400 if address sub param street is not provided', async () => {
    const { address: { street, ...addressWithouField }, ...requestWithoutField } = request;

    const response = await sut.perform({ ...requestWithoutField, address: addressWithouField } as any);

    expect(response).toEqual({
      data: new RequiredSubParamError('address', 'street'),
      statusCode: 400,
    });
  });

  it('Should return 400 if address sub param neighborhood is not provided', async () => {
    const { address: { neighborhood, ...addressWithouField }, ...requestWithoutField } = request;

    const response = await sut.perform({ ...requestWithoutField, address: addressWithouField } as any);

    expect(response).toEqual({
      data: new RequiredSubParamError('address', 'neighborhood'),
      statusCode: 400,
    });
  });

  it('Should return 400 if address sub param city is not provided', async () => {
    const { address: { city, ...addressWithouField }, ...requestWithoutField } = request;

    const response = await sut.perform({ ...requestWithoutField, address: addressWithouField } as any);

    expect(response).toEqual({
      data: new RequiredSubParamError('address', 'city'),
      statusCode: 400,
    });
  });

  it('Should return 400 if address sub param state is not provided', async () => {
    const { address: { state, ...addressWithouField }, ...requestWithoutField } = request;

    const response = await sut.perform({ ...requestWithoutField, address: addressWithouField } as any);

    expect(response).toEqual({
      data: new RequiredSubParamError('address', 'state'),
      statusCode: 400,
    });
  });

  it('Should return 400 if address sub param postalCode is not provided', async () => {
    const { address: { postalCode, ...addressWithouField }, ...requestWithoutField } = request;

    const response = await sut.perform({ ...requestWithoutField, address: addressWithouField } as any);

    expect(response).toEqual({
      data: new RequiredSubParamError('address', 'postalCode'),
      statusCode: 400,
    });
  });

  it('Should return 400 if address sub param postalCode is invalid', async () => {
    const invalidRequest = { ...request, address: { ...request.address } };
    invalidRequest.address.postalCode = '000-000';

    const response = await sut.perform(invalidRequest);

    expect(response).toEqual({
      data: new InvalidParamError('postalCode'),
      statusCode: 400,
    });
  });

  it('Should return 400 if email is invalid', async () => {
    const response = await sut.perform({ ...request, email: 'invalid_email' });

    expect(response).toEqual({
      data: new InvalidParamError('email'),
      statusCode: 400,
    });
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
