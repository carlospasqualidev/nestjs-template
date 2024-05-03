import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user';
import { UserPrismaRepository } from 'src/repositories/user/user-prisma.repository';
import { UserCreateUseCase } from 'src/use-cases/user/user-create.use-case';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserPrismaRepository, UserCreateUseCase],
})
export class UserModule {}
