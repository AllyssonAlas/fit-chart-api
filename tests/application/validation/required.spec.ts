import { Required } from '@/application/validation';
import { RequiredParamError } from '@/application/errors';

describe('Required', () => {
  it('Should return RequiredParamError if value is null', () => {
    const sut = new Required(null, 'field');

    const error = sut.validate();

    expect(error).toEqual(new RequiredParamError('field'));
  });
});
