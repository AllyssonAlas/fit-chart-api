import { Required, RequiredParam, ValidationBuilder } from '@/application/validation';

describe('ValidationBuilder', () => {
  it('Should return RequiredParam and Required validators', () => {
    const data = { value: 'any_value' };
    const validators = ValidationBuilder
      .of({ value: data, fieldName: 'value' })
      .required()
      .build();

    expect(validators).toEqual([
      new RequiredParam(data, 'value'),
      new Required(data.value, 'value'),
    ]);
  });
});
