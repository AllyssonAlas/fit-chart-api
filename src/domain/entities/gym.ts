import type { Address } from '@/domain/entities/generic-types';

export type GymData = {
  name: string;
  email?: string;
  contact: string;
  administrators?: string[];
  address: Address;
};

export class Gym {
  name: string;
  email?: string;
  contact: string;
  administrators?: string[];
  address: Address;

  constructor(data: GymData) {
    this.name = data.name;
    this.email = data.email;
    this.administrators = data.administrators;
    this.contact = data.contact;
    this.address = data.address;
  }

  finNonExistentUser(usersEmail: string[]): string | undefined {
    return this.administrators?.find((email) => !usersEmail?.includes(email));
  }
}
