import { InvalidParamError } from '@/application/errors';
import { NullableParam } from '@/application/validation';

describe('NullableParam', () => {
  it('Should return an InvalidParamError if value type is not allowed', () => {
    const sut = new NullableParam({}, 'field', 'string');

    const error = sut.validate();

    expect(error).toEqual(new InvalidParamError('field'));
  });

  it('Should return an InvalidParamError if value type is not allowed', () => {
    const sut = new NullableParam({ field: undefined }, 'field', 'string');

    const error = sut.validate();

    expect(error).toEqual(new InvalidParamError('field'));
  });

  it('Should return an InvalidParamError if value type is not allowed', () => {
    const sut = new NullableParam({ field: 123 }, 'field', 'string');

    const error = sut.validate();

    expect(error).toEqual(new InvalidParamError('field'));
  });
});
