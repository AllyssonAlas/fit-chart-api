import { InvalidParamError } from '@/application/errors';
import { NullableParam } from '@/application/validation';

describe('NullableParam', () => {
  it('Should return a InvalidParamError if value type is not allowed', () => {
    const sut = new NullableParam({}, 'field', 'string');

    const error = sut.validate();

    expect(error).toEqual(new InvalidParamError('field'));
  });
});
