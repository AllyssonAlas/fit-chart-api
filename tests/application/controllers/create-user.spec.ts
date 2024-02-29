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
});
