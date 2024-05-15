import { CanActivate, ExecutionContext, Type } from '@nestjs/common';
import { jwt } from '../jwt';

export function AuthGuard(...permissions: string[]): Type<CanActivate> {
  class AuthGuardClass implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();

      try {
        const token = jwt.extractTokenFromHeader(request);
        jwt.verify(token);

        const userPermissions = ['admin', 'user'];

        const hasPermission = permissions.every((permission) =>
          userPermissions.includes(permission),
        );

        return hasPermission;
      } catch (error) {
        return false;
      }
    }
  }

  return AuthGuardClass;
}
