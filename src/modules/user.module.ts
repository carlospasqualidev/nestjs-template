import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user';
import { UserRepository } from 'src/repositories/user/user.repository';
import { UserCreateUseCase } from 'src/use-cases/user/user-create.use-case';

@Module({
  controllers: [UserController],
  providers: [UserRepository, UserCreateUseCase],
})
export class UserModule {}
