import { InvalidParamError } from '@/application/errors';
import { RequiredArray, RequiredNumberArray, RequiredStringArray } from '@/application/validation';

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

  it('Should return undefined if validation succeeds', () => {
    const sut = new RequiredArray([], 'field');

    const error = sut.validate();

    expect(error).toBeUndefined();
  });
});

describe('RequiredStringArray', () => {
  it('Should return InvalidParamError if value is a multi value array', () => {
    const sut = new RequiredStringArray(['any_value', 5, null, undefined], 'field');

    const error = sut.validate();

    expect(error).toEqual(new InvalidParamError('field'));
  });

  it('Should return InvalidParamError if value is a multi value array', () => {
    const sut = new RequiredStringArray(['any_value_1', 'any_value_2', 'any_value_3'], 'field');

    const error = sut.validate();

    expect(error).toBeUndefined();
  });
});

describe('RequiredNumberArray', () => {
  it('Should return InvalidParamError if value is a multi value array', () => {
    const sut = new RequiredNumberArray(['any_value', 5, null, undefined], 'field');

    const error = sut.validate();

    expect(error).toEqual(new InvalidParamError('field'));
  });
});
