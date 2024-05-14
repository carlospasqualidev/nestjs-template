import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { RouterModule } from '@nestjs/core';
import { AuthenticationModule } from './authentication.module';

@Module({
  imports: [
    AuthenticationModule,
    UserModule,
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
  ],
})
export class AppModule {}
