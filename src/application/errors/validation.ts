export class RequiredParamError extends Error {
  constructor(param: string) {
    super(`Required param: ${param}.`);
    this.name = 'RequiredParamError';
  }
}

export class RequiredSubParamError extends Error {
  constructor(param: string, subParam: string) {
    super(`Param ${param} requires ${subParam}.`);
    this.name = 'RequiredSubParamError';
  }
}

export class InvalidParamError extends Error {
  constructor(param: string) {
    super(`Invalid param: ${param}`);
    this.name = 'InvalidParamError';
  }
}

export class LengthParamError extends Error {
  constructor(param: string, length: number) {
    super(`Param ${param} length should be ${length}`);
    this.name = 'LengthParamError';
  }
}
