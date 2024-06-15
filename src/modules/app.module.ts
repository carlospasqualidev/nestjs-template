import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { RouterModule } from '@nestjs/core';
import { AuthenticationModule } from './authentication.module';
import { UserPermissionModule } from './user-permission.module';

@Module({
  imports: [
    AuthenticationModule,
    UserModule,
    UserPermissionModule,
    RouterModule.register([
      {
        path: 'auth',
        module: AuthenticationModule,
      },
    ]),
    RouterModule.register([
      {
        path: 'users',
        module: UserModule,
      },
    ]),
    RouterModule.register([
      {
        path: 'users-permissions',
        module: UserPermissionModule,
      },
    ]),
  ],
})
export class AppModule {}
