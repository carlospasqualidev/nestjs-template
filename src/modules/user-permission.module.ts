import { Module } from '@nestjs/common';
import { UserPermissionController } from 'src/controllers/user-permission';
import { UserRepository } from 'src/repositories/user';
import { UserPermissionRepository } from 'src/repositories/user-permission';
import {
  UserPermissionCreateUseCase,
  UserPermissionDeleteByIdUseCase,
} from 'src/use-cases/user-permission';

@Module({
  providers: [
    UserRepository,
    UserPermissionRepository,
    UserPermissionCreateUseCase,
    UserPermissionDeleteByIdUseCase,
  ],
  controllers: [UserPermissionController],
})
export class UserPermissionModule {}
