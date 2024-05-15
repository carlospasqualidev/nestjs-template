import { UserController } from '../controllers/user';
import { UserRepository } from 'src/repositories/user/user.repository';
import { UserCreateUseCase } from 'src/use-cases/user/user-create.use-case';
import { Module } from '@nestjs/common';

@Module({
  providers: [UserRepository, UserCreateUseCase],
  controllers: [UserController],
})
export class UserModule {}
