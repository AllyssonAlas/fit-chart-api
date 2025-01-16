import { type MockProxy, mock } from 'jest-mock-extended';

import { ValidationComposite, type Validator } from '@/application/validation';

describe('ValidationComposite', () => {
  let sut: ValidationComposite;
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
    sut = new ValidationComposite(validators);
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

  it('Should return correct error', () => {
    validator2.validate.mockReturnValueOnce(new Error('validator_2_error'));

    const error = sut.validate();

    expect(error).toEqual(new Error('validator_2_error'));
  });
});
