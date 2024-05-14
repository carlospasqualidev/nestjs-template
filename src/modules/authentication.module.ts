import { Module } from '@nestjs/common';

import { UserRepository } from 'src/repositories/user/user.repository';
import { AuthenticationController } from 'src/controllers/authentication';
import {
  AuthenticationLoginUseCase,
  AuthenticationRefreshAccessTokenUseCase,
} from 'src/use-cases/authentication';

@Module({
  controllers: [AuthenticationController],
  providers: [
    UserRepository,
    AuthenticationLoginUseCase,
    AuthenticationRefreshAccessTokenUseCase,
  ],
})
export class AuthenticationModule {}
