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
    const requiredFields = ['name', 'email', 'password', 'role', 'contact', 'address'];
    for (const field of requiredFields) {
      if (!Object.keys(request).includes(field)) {
        return {
          statusCode: 400,
          body: new Error(`Field ${field} is required`),
        };
      }
    }
    const requiredAddressSubfields = ['number', 'street', 'neighborhood'];
    for (const field of requiredAddressSubfields) {
      if (!Object.keys(request.address).includes(field)) {
        return {
          statusCode: 400,
          body: new Error(`Subfield ${field} of field address is required`),
        };
      }
    }
  }
}
