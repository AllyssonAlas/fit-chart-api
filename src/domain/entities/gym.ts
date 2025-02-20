export class Gym {
  name: string;
  email?: string;
  contact: string;
  ownerEmail: string;
  administrators?: string[];
  address: {
    number: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    complement: string | null;
  };

  constructor(data: Gym) {
    this.name = data.name;
    this.email = data.email;
    this.ownerEmail = data.ownerEmail;
    this.administrators = data.administrators;
    this.contact = data.contact;
    this.address = data.address;
  }
}
