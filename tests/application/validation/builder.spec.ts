import { RequiredParam, RequiredPattern, RequiredString, ValidationBuilder } from '@/application/validation';

describe('ValidationBuilder', () => {
  it('Should return RequiredParam and Required validators', () => {
    const data = { value: 'any_value' };
    const validators = ValidationBuilder
      .of(data)
      .field('value')
      .required()
      .build();

    expect(validators).toEqual([
      new RequiredParam(data, 'value'),
    ]);
  });

  it('Should return RequiredParam with subFieldFrom and Required validators', () => {
    const data = { value: { field: 'any_value' } };

    const validators = ValidationBuilder
      .of(data.value)
      .field('field')
      .required('value')
      .build();

    expect(validators).toEqual([
      new RequiredParam(data.value, 'field', 'value'),
    ]);
  });

  it('Should return RequiredString validator', () => {
    const data = { value: 'any_value' };
    const validators = ValidationBuilder
      .of(data)
      .field('value')
      .string()
      .build();

    expect(validators).toEqual([
      new RequiredString(data.value, 'value'),
    ]);
  });

  it('Should return RequiredPattern validator with email regex', () => {
    const data = { value: 'any_value' };
    const validators = ValidationBuilder
      .of(data)
      .field('value')
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
      .of(data)
      .field('value')
      .string()
      .postalCode()
      .build();

    expect(validators).toEqual([
      new RequiredString(data.value, 'value'),
      new RequiredPattern(data.value, 'value', /^[0-9]{5}-[0-9]{3}$/),
    ]);
  });
});
