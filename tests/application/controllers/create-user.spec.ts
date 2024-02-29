import { CreateUserController } from '@/application/controllers';

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
      postalCode: 'any_postal_code',
      state: 'any_state',
      street: 'any_street',
    },
  };

  let sut: CreateUserController;

  beforeEach(() => {
    sut = new CreateUserController();
  });

  it('Should return 400 if field name is not provided', async () => {
    const { name, ...requestWithoutField } = request;

    const response = await sut.perform(requestWithoutField as any);

    expect(response).toEqual({
      statusCode: 400,
      body: new Error('Field name is required'),
    });
  });

  it('Should return 400 if field email is not provided', async () => {
    const { email, ...requestWithoutField } = request;

    const response = await sut.perform(requestWithoutField as any);

    expect(response).toEqual({
      statusCode: 400,
      body: new Error('Field email is required'),
    });
  });

  it('Should return 400 if field password is not provided', async () => {
    const { password, ...requestWithoutField } = request;

    const response = await sut.perform(requestWithoutField as any);

    expect(response).toEqual({
      statusCode: 400,
      body: new Error('Field password is required'),
    });
  });

  it('Should return 400 if field role is not provided', async () => {
    const { role, ...requestWithoutField } = request;

    const response = await sut.perform(requestWithoutField as any);

    expect(response).toEqual({
      statusCode: 400,
      body: new Error('Field role is required'),
    });
  });

  it('Should return 400 if field contact is not provided', async () => {
    const { contact, ...requestWithoutField } = request;

    const response = await sut.perform(requestWithoutField as any);

    expect(response).toEqual({
      statusCode: 400,
      body: new Error('Field contact is required'),
    });
  });

  it('Should return 400 if field address is not provided', async () => {
    const { address, ...requestWithoutField } = request;

    const response = await sut.perform(requestWithoutField as any);

    expect(response).toEqual({
      statusCode: 400,
      body: new Error('Field address is required'),
    });
  });

  it('Should return 400 if address subfield number is not provided', async () => {
    const { address: { number, ...addressWithouField }, ...requestWithoutField } = request;

    const response = await sut.perform({ ...requestWithoutField, address: addressWithouField } as any);

    expect(response).toEqual({
      statusCode: 400,
      body: new Error('Subfield number of field address is required'),
    });
  });

  it('Should return 400 if address subfield street is not provided', async () => {
    const { address: { street, ...addressWithouField }, ...requestWithoutField } = request;

    const response = await sut.perform({ ...requestWithoutField, address: addressWithouField } as any);

    expect(response).toEqual({
      statusCode: 400,
      body: new Error('Subfield street of field address is required'),
    });
  });

  it('Should return 400 if address subfield neighborhood is not provided', async () => {
    const { address: { neighborhood, ...addressWithouField }, ...requestWithoutField } = request;

    const response = await sut.perform({ ...requestWithoutField, address: addressWithouField } as any);

    expect(response).toEqual({
      statusCode: 400,
      body: new Error('Subfield neighborhood of field address is required'),
    });
  });

  it('Should return 400 if address subfield city is not provided', async () => {
    const { address: { city, ...addressWithouField }, ...requestWithoutField } = request;

    const response = await sut.perform({ ...requestWithoutField, address: addressWithouField } as any);

    expect(response).toEqual({
      statusCode: 400,
      body: new Error('Subfield city of field address is required'),
    });
  });
});
