import { Required, RequiredParam, RequiredPattern, RequiredString, ValidationBuilder } from '@/application/validation';

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

  it('Should return RequiredString validator', () => {
    const data = { value: 'any_value' };
    const validators = ValidationBuilder
      .of({ value: data, fieldName: 'value' })
      .string()
      .build();

    expect(validators).toEqual([
      new RequiredString(data.value, 'value'),
    ]);
  });

  it('Should return RequiredPattern validator with email regex', () => {
    const data = { value: 'any_value' };
    const validators = ValidationBuilder
      .of({ value: data, fieldName: 'value' })
      .string()
      .email()
      .build();

    expect(validators).toEqual([
      new RequiredString(data.value, 'value'),
      new RequiredPattern(data.value, 'value', /^[\w.]+@\w+.\w{2,}(?:.\w{2})?$/gmi),
    ]);
  });

  it('Should return RequiredPattern validator with postal code regex', () => {
    const data = { value: 'any_value' };
    const validators = ValidationBuilder
      .of({ value: data, fieldName: 'value' })
      .string()
      .postalCode()
      .build();

    expect(validators).toEqual([
      new RequiredString(data.value, 'value'),
      new RequiredPattern(data.value, 'value', /^[0-9]{5}-[0-9]{3}$/),
    ]);
  });
});
