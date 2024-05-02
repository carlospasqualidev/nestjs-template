import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { UserPrismaRepository } from 'src/repositories/user/user-prisma.repository';
import { UserCreateUseCase } from 'src/use-cases/user/user-create.use-case';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [UserPrismaRepository, UserCreateUseCase],
})
export class UserModule {}
