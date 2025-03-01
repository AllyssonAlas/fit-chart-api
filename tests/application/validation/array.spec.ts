import { InvalidParamError } from '@/application/errors';
import { RequiredArray } from '@/application/validation';

describe('RequiredArray', () => {
  it('Should return InvalidParamError if value is null', () => {
    const sut = new RequiredArray(null, 'field');

    const error = sut.validate();

    expect(error).toEqual(new InvalidParamError('field'));
  });

  it('Should return InvalidParamError if value is undefined', () => {
    const sut = new RequiredArray(undefined, 'field');

    const error = sut.validate();

    expect(error).toEqual(new InvalidParamError('field'));
  });

  it('Should return InvalidParamError if value is string', () => {
    const sut = new RequiredArray('', 'field');

    const error = sut.validate();

    expect(error).toEqual(new InvalidParamError('field'));
  });

  it('Should return InvalidParamError if value is number', () => {
    const sut = new RequiredArray(1, 'field');

    const error = sut.validate();

    expect(error).toEqual(new InvalidParamError('field'));
  });
});
