import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { jwt } from '../jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const token = jwt.extractTokenFromHeader(request);

    try {
      jwt.verify(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
