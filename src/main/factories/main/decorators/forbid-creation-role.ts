import type { Controller } from '@/application/controllers';
import { ForbidRoleCreationDecorator } from '@/main/decorators';
import { makeCreateUserController } from '@/main/factories/application/controllers';

export const makeForbidRoleCreationDecorator = (forbidRoles: string[]): Controller => {
  return new ForbidRoleCreationDecorator(forbidRoles, makeCreateUserController());
};
