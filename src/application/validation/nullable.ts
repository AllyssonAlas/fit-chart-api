import { InvalidParamError } from '@/application/errors';

export class NullableParam {
  constructor(
    private readonly value: any,
    private readonly fieldName: string,
    private readonly valueType: string,
  ) {}

  validate(): Error | undefined {
    const fieldValue = this.value[this.fieldName];
    // biome-ignore lint/suspicious/useValidTypeof: This validation needs to use typeof dynamically
    if (fieldValue !== null && typeof fieldValue !== this.valueType) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
