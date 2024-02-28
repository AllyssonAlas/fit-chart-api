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
  async perform(request: Request): Promise<any> {
    return {
      statusCode: 400,
      body: new Error('Field name is required'),
    };
  }
}
