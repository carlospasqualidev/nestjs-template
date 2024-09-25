//#IMPORTS
import { Module } from '@nestjs/common';
//#endregion

//#REGION REPOSITORIES
import { UserRepository } from 'src/infrastructure/database/prisma/repositories';
//#endregion

//#REGION CONTROLLERS
import { RegisterController } from '../controllers/register';
//#endregion

//#REGION USE CASES
import {
  RegisterSendEmailForRegistrationUseCase,
  RegisterUser,
} from 'src/application/use-cases/register';
//#endregions

@Module({
  controllers: [RegisterController],
  providers: [
    UserRepository,
    RegisterSendEmailForRegistrationUseCase,
    RegisterUser,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
})
export class RegisterModule {}
