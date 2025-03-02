import { Controller, CreateGymController } from '@/application/controllers';
import {
  RequiredArray,
  RequiredLength,
  RequiredParam,
  RequiredPattern,
  RequiredString,
  RequiredStringArray,
} from '@/application/validation';

describe('CreateGymController', () => {
  const request = {
    name: 'any_gym_name',
    email: 'any_gym_email@mail.com',
    contact: 'any_gym_contact',
    ownerEmail: 'any_owner_email@mail.com',
    administrators: ['any_administrator_email_1@mail.com', 'any_administrator_email_2@mail.com'],
    address: {
      city: 'any_city',
      neighborhood: 'any_neighborhood',
      number: 'any_number',
      postalCode: '00000-000',
      state: 'st',
      street: 'any_street',
      complement: 'any_complement',
    },
  };

  let sut: CreateGymController;
  let createGym: jest.Mock;

  beforeAll(() => {
    createGym = jest.fn();
  });

  beforeEach(() => {
    sut = new CreateGymController(createGym);
  });

  it('Should extend controller', () => {
    expect(sut).toBeInstanceOf(Controller);
  });

  it('Should build Validators correctly', () => {
    const validators = sut.buildValidators(request);

    expect(validators).toEqual([
      new RequiredParam(request, 'name'),
      new RequiredString(request.name, 'name'),
      new RequiredParam(request, 'email'),
      new RequiredString(request.email, 'email'),
      new RequiredPattern(request.email, 'email', /^[\w.]+@\w+.\w{2,}(?:.\w{2})?$/gim),
      new RequiredParam(request, 'contact'),
      new RequiredString(request.contact, 'contact'),
      new RequiredParam(request, 'ownerEmail'),
      new RequiredString(request.ownerEmail, 'ownerEmail'),
      new RequiredPattern(request.ownerEmail, 'ownerEmail', /^[\w.]+@\w+.\w{2,}(?:.\w{2})?$/gim),
      new RequiredParam(request, 'administrators'),
      new RequiredArray(request.administrators, 'administrators'),
      new RequiredStringArray(request.administrators, 'administrators'),
      new RequiredParam(request, 'address'),
      new RequiredParam(request.address, 'number', 'address'),
      new RequiredString(request.address.number, 'number'),
      new RequiredParam(request.address, 'street', 'address'),
      new RequiredString(request.address.street, 'street'),
      new RequiredParam(request.address, 'neighborhood', 'address'),
      new RequiredString(request.address.neighborhood, 'neighborhood'),
      new RequiredParam(request.address, 'city', 'address'),
      new RequiredString(request.address.city, 'city'),
      new RequiredParam(request.address, 'state', 'address'),
      new RequiredString(request.address.state, 'state'),
      new RequiredLength(request.address.state, 'state', 2),
      new RequiredParam(request.address, 'postalCode', 'address'),
      new RequiredString(request.address.postalCode, 'postalCode'),
      new RequiredPattern(request.address.postalCode, 'postalCode', /^[0-9]{5}-[0-9]{3}$/),
    ]);
  });

  it('Should call CreateGym with correct input', async () => {
    await sut.handle(request);

    expect(createGym).toHaveBeenCalledWith(request);
    expect(createGym).toHaveBeenCalledTimes(1);
  });
});
