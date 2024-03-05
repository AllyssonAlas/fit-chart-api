import { mock, MockProxy } from 'jest-mock-extended';

import { ValidatorComposite, Validator } from '@/application/validation';

describe('ValidatorComposite', () => {
  let sut: ValidatorComposite;
  let validator1: MockProxy<Validator>;
  let validator2: MockProxy<Validator>;
  let validators: Validator[];

  beforeAll(() => {
    validator1 = mock();
    validator1.validate.mockReturnValue(undefined);
    validator2 = mock();
    validator2.validate.mockReturnValue(undefined);
    validators = [validator1, validator2];
  });

  beforeEach(() => {
    sut = new ValidatorComposite(validators);
  });

  it('Should return undefined if all Validators return undefined', () => {
    const error = sut.validate();

    expect(error).toBeUndefined();
  });

  it('Should return first error', () => {
    validator1.validate.mockReturnValueOnce(new Error('validator_1_error'));
    validator2.validate.mockReturnValueOnce(new Error('validator_2_error'));

    const error = sut.validate();

    expect(error).toEqual(new Error('validator_1_error'));
  });
});
