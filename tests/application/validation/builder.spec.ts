import {
  NullableParam,
  RequiredLength,
  RequiredParam,
  RequiredPattern,
  RequiredString,
  ValidationBuilder,
} from '@/application/validation';

describe('ValidationBuilder', () => {
  it('Should return a validators array if value is null', () => {
    const validators = ValidationBuilder.of(null).field('value').required().build();

    expect(validators).toEqual([new RequiredParam({}, 'value')]);
  });

  it('Should return a validators array if value is undefined', () => {
    const validators = ValidationBuilder.of(undefined).field('value').required().build();

    expect(validators).toEqual([new RequiredParam({}, 'value')]);
  });

  it('Should return RequiredParam and Required validators', () => {
    const data = { value: 'any_value' };
    const validators = ValidationBuilder.of(data).field('value').required().build();

    expect(validators).toEqual([new RequiredParam(data, 'value')]);
  });

  it('Should return RequiredParam with subFieldFrom and Required validators', () => {
    const data = { value: { field: 'any_value' } };

    const validators = ValidationBuilder.of(data.value).field('field').required('value').build();

    expect(validators).toEqual([new RequiredParam(data.value, 'field', 'value')]);
  });

  it('Should return RequiredString validator', () => {
    const data = { value: 'any_value' };
    const validators = ValidationBuilder.of(data).field('value').string().build();

    expect(validators).toEqual([new RequiredString(data.value, 'value')]);
  });

  it('Should return RequiredPattern validator with email regex', () => {
    const data = { value: 'any_value' };
    const validators = ValidationBuilder.of(data).field('value').string().email().build();

    expect(validators).toEqual([
      new RequiredString(data.value, 'value'),
      new RequiredPattern(data.value, 'value', /^[\w.]+@\w+.\w{2,}(?:.\w{2})?$/gim),
    ]);
  });

  it('Should return RequiredPattern validator with postal code regex', () => {
    const data = { value: 'any_value' };
    const validators = ValidationBuilder.of(data).field('value').string().postalCode().build();

    expect(validators).toEqual([
      new RequiredString(data.value, 'value'),
      new RequiredPattern(data.value, 'value', /^[0-9]{5}-[0-9]{3}$/),
    ]);
  });

  it('Should return RequiredLength validator', () => {
    const data = { value: 'any_value' };
    const validators = ValidationBuilder.of(data).field('value').string().length(5).build();

    expect(validators).toEqual([new RequiredString(data.value, 'value'), new RequiredLength(data.value, 'value', 5)]);
  });

  it('Should return NullableParam validator', () => {
    const data = { value: 'any_value' };
    const validators = ValidationBuilder.of(data).field('value').nullable('string').string().build();

    expect(validators).toEqual([
      new NullableParam(data.value, 'value', 'string'),
      new RequiredString(data.value, 'value'),
    ]);
  });
});
