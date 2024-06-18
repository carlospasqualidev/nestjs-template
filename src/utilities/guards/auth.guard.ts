import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Type,
} from '@nestjs/common';
import { jwt } from '../jwt';
import { UserPermissionRepository } from 'src/repositories/user-permission';
import { $Enums } from '@prisma/client';

export function AuthGuard(
  ...permissions: $Enums.Permissions[]
): Type<CanActivate> {
  class AuthGuardClass implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const userPermissionRepository = new UserPermissionRepository();

      const request = context.switchToHttp().getRequest();

      const token = jwt.extractTokenFromHeader(request);
      const payload = jwt.verify(token);

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
