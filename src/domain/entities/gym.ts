import type { Address } from '@/domain/entities/generic-types';
import type { User } from '@/domain/entities/user';

export type GymData = {
  name: string;
  email?: string;
  contact: string;
  ownerEmail: string;
  administrators?: string[];
  address: Address;
};

export class Gym {
  name: string;
  email?: string;
  contact: string;
  ownerEmail: string;
  administrators?: string[];
  address: Address;

  constructor(data: GymData) {
    this.name = data.name;
    this.email = data.email;
    this.ownerEmail = data.ownerEmail;
    this.administrators = data.administrators;
    this.contact = data.contact;
    this.address = data.address;
  }

  finNonExistentUser(users: User[]): string | undefined {
    return this.administrators?.find((admEmail) => !users.find(({ email }) => email === admEmail));
  }
}
