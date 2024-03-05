import { ValidatorComposite } from '@/application/validation';

describe('ValidatorComposite', () => {
  it('Should return undefined if all Validators return undefined', () => {
    const sut = new ValidatorComposite();

    const error = sut.validate();

    expect(error).toBeUndefined();
  });
});
