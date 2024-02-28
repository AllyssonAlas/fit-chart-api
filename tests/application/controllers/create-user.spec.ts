import { CreateUserController } from '@/application/controllers';

describe('CreateUserController', () => {
  it('Should return 400 if field name is not provided', async () => {
    const sut = new CreateUserController();

    const response = await sut.perform({
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
    } as any);

    expect(response).toEqual({
      statusCode: 400,
      body: new Error('Field name is required'),
    });
  });
});
