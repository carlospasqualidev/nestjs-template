import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Type,
} from '@nestjs/common';
import { IAuthorizationToken, jwt } from '../jwt';
import { enums } from 'src/infrastructure/database/prisma';
import { UserPermissionRepository } from 'src/infrastructure/database/prisma/repositories/user-permission.repository';

export function AuthGuard(
  ...permissions: enums.Permissions[]
): Type<CanActivate> {
  class AuthGuardClass implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const userPermissionRepository = new UserPermissionRepository();

      const request = context.switchToHttp().getRequest();

      const token = jwt.extractTokenFromHeader(request);
      const payload = jwt.verify<IAuthorizationToken>(token);

      const userPermissions = await userPermissionRepository.findManyByUserId(
        payload.user.id,
      );
      const hasPermission = permissions.every((permission) =>
        userPermissions.includes(permission),
      );

      if (!hasPermission) {
        throw new ForbiddenException('Permissão inválida.');
      }

      return hasPermission;
    }
  }

  return AuthGuardClass;
}
