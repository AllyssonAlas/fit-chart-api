type Data = {
  name: string;
  email: string;
  password: string;
  role: string;
  contact: string;
  address: {
    number: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    complement?: string;
  };
};

export class User {
  name: string;
  email: string;
  password: string;
  role: string;
  contact: string;
  address: {
    number: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    complement?: string;
  };

  constructor(data: Data) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
    this.contact = data.contact;
    this.address = data.address;
  }
}
