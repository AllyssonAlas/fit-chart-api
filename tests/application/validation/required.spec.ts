import { InvalidParamError, LengthParamError, RequiredParamError, RequiredSubParamError } from '@/application/errors';
import {
  Required,
  RequiredLength,
  RequiredNumber,
  RequiredParam,
  RequiredPattern,
  RequiredString,
} from '@/application/validation';

describe('Required', () => {
  it('Should return RequiredParamError if value is null', () => {
    const sut = new Required(null, 'field');

    const error = sut.validate();

    expect(error).toEqual(new RequiredParamError('field'));
  });

  it('Should return RequiredParamError if value is undefined', () => {
    const sut = new Required(undefined, 'field');

    const error = sut.validate();

    expect(error).toEqual(new RequiredParamError('field'));
  });

  it('Should return RequiredParamError if value is empty', () => {
    const sut = new Required('', 'field');

    const error = sut.validate();

    expect(error).toEqual(new RequiredParamError('field'));
  });

  it('Should return undefined if validation succeeds', () => {
    const sut = new Required('any_value', 'field');

    const error = sut.validate();

    expect(error).toBeUndefined();
  });
});

describe('RequiredParam', () => {
  it('Should be instance of Required', () => {
    const sut = new RequiredParam({}, 'field');

    expect(sut).toBeInstanceOf(Required);
  });

  it('Should return RequiredParamError if value is not an object', () => {
    const sut = new RequiredParam('field' as any, 'field');

    const error = sut.validate();

    expect(error).toEqual(new RequiredParamError('field'));
  });

  it('Should return RequiredParamError if value does not contain fieldName', () => {
    const sut = new RequiredParam({}, 'field');

    const error = sut.validate();

    expect(error).toEqual(new RequiredParamError('field'));
  });

  it('Should return RequiredParamError if field from value is falsy', () => {
    const sut = new RequiredParam({ field: '' }, 'field');

    const error = sut.validate();

    expect(error).toEqual(new RequiredParamError('field'));
  });

  it('Should return RequiredSubParamError if subParamFrom is received', () => {
    const sut = new RequiredParam({}, 'subField', 'field');

    const error = sut.validate();

    expect(error).toEqual(new RequiredSubParamError('field', 'subField'));
  });

  it('Should return undefined if validation succeeds', () => {
    const sut = new RequiredParam({ field: 'any_value' }, 'field');

    const error = sut.validate();

    expect(error).toBeUndefined();
  });
});

describe('RequiredString', () => {
  it('Should be instance of Required', () => {
    const sut = new RequiredString('any_value', 'field');

    expect(sut).toBeInstanceOf(Required);
  });

  it('Should return InvalidParamError if value is not a string', () => {
    const sut = new RequiredString(100 as any, 'field');

    const error = sut.validate();

    expect(error).toEqual(new InvalidParamError('field'));
  });

  it('Should return undefined if validation succeeds', () => {
    const sut = new RequiredString('any_value', 'field');

    const error = sut.validate();

    expect(error).toBeUndefined();
  });
});

describe('RequiredNumber', () => {
  it('Should be instance of Required', () => {
    const sut = new RequiredNumber(123, 'field');

    expect(sut).toBeInstanceOf(Required);
  });

  it('Should return InvalidParamError if value is not a string', () => {
    const sut = new RequiredNumber('any_value' as any, 'field');

    const error = sut.validate();

    expect(error).toEqual(new InvalidParamError('field'));
  });
});

describe('RequiredPattern', () => {
  it('Should be instance of Required', () => {
    const sut = new RequiredPattern('any_value', 'field', /any_pattern/);

    expect(sut).toBeInstanceOf(RequiredString);
  });

  it('Should return InvalidParamError if value does not fit in pattern', () => {
    const sut = new RequiredPattern('any_value', 'field', /any_pattern/);

    const error = sut.validate();

    expect(error).toEqual(new InvalidParamError('field'));
  });

  it('Should return undefined if validation succeeds', () => {
    const sut = new RequiredPattern('any_pattern', 'field', /any_pattern/);

    const error = sut.validate();

    expect(error).toBeUndefined();
  });
});

describe('RequiredLength', () => {
  it('Should be instance of RequiredString', () => {
    const sut = new RequiredLength('any_value', 'field', 5);

    expect(sut).toBeInstanceOf(RequiredString);
  });

  it('Should return LengthParamError if value length is not equal to required length', () => {
    const sut = new RequiredLength('1234', 'field', 5);

    const error = sut.validate();

    expect(error).toEqual(new LengthParamError('field', 5));
  });

  it('Should return undefined if value length is equal to required length', () => {
    const sut = new RequiredLength('12345', 'field', 5);

    const error = sut.validate();

    expect(error).toBeUndefined();
  });
});
