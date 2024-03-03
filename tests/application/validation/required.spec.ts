import { Required } from '@/application/validation';
import { RequiredParamError } from '@/application/errors';

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
