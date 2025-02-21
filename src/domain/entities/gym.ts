import type { Address } from '@/domain/entities/generic-types';

export class Gym {
  name: string;
  email?: string;
  contact: string;
  ownerEmail: string;
  administrators?: string[];
  address: Address;

  constructor(data: Gym) {
    this.name = data.name;
    this.email = data.email;
    this.ownerEmail = data.ownerEmail;
    this.administrators = data.administrators;
    this.contact = data.contact;
    this.address = data.address;
  }
}
