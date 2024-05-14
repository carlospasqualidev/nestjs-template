import { Module } from '@nestjs/common';

import { UserRepository } from 'src/repositories/user/user.repository';
import { AuthenticationController } from 'src/controllers/authentication';
import {
  AuthenticationLoginUseCase,
  AuthenticationLogoutUseCase,
  AuthenticationRefreshAccessTokenUseCase,
} from 'src/use-cases/authentication';

@Module({
  controllers: [AuthenticationController],
  providers: [
    UserRepository,
    AuthenticationLoginUseCase,
    AuthenticationLogoutUseCase,
    AuthenticationRefreshAccessTokenUseCase,
  ],
})
export class AuthenticationModule {}
