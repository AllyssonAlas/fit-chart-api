import { mock } from 'jest-mock-extended';

import { ValidatorComposite, Validator } from '@/application/validation';

describe('ValidatorComposite', () => {
  it('Should return undefined if all Validators return undefined', () => {
    const sut = new ValidatorComposite([]);

    const error = sut.validate();

    expect(error).toBeUndefined();
  });

  it('Should return first error', () => {
    const validator1 = mock<Validator>();
    validator1.validate.mockReturnValueOnce(new Error('validator_1_error'));
    const validator2 = mock<Validator>();
    validator2.validate.mockReturnValueOnce(new Error('validator_2_error'));
    const validators = [validator1, validator2];
    const sut = new ValidatorComposite(validators);

    const error = sut.validate();

    expect(error).toEqual(new Error('validator_1_error'));
  });
});
