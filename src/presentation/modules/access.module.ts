//#IMPORTS
import { Module } from '@nestjs/common';
//#endregion

//#REGION REPOSITORIES
import { UserRepository } from 'src/infrastructure/database/prisma/repositories';
//#endregion

//#REGION CONTROLLERS
import { AccessController } from '../controllers/access';
//#endregion

//#REGION USE CASES
import {
  AccessLoginUseCase,
  AccessLogoutUseCase,
  AccessRefreshAccessTokenUseCase,
  AccessUpdatePasswordUseCase,
  AccessSendEmailForUpdatePasswordUseCase,
} from 'src/application/use-cases/access';
//#endregions

@Module({
  controllers: [AccessController],
  providers: [
    UserRepository,
    AccessLoginUseCase,
    AccessLogoutUseCase,
    AccessRefreshAccessTokenUseCase,
    AccessUpdatePasswordUseCase,
    AccessSendEmailForUpdatePasswordUseCase,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
})
export class AccessModule {}
