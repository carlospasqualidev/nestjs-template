import { UserController } from '../controllers/user';
import { UserRepository } from 'src/repositories/user/user.repository';
import {
  UserCreateUseCase,
  UserFindByIdUseCase,
  UserUpdateUseCase,
  UserDeleteByIdUseCase,
} from 'src/use-cases/user';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    UserRepository,
    UserCreateUseCase,
    UserUpdateUseCase,
    UserFindByIdUseCase,
    UserDeleteByIdUseCase,
  ],
  controllers: [UserController],
})
export class UserModule {}
