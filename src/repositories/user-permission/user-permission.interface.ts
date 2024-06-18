import { $Enums } from '@prisma/client';
import {
  // EnumPermissions,
  UserPermissionEntity,
} from 'src/entities/user-permission';

export interface IFindOptions {
  validate: boolean;
}

export interface IUserPermissionRepository {
  create(permission: UserPermissionEntity): Promise<UserPermissionEntity>;

  findById(
    id: string,
    options?: IFindOptions,
  ): Promise<UserPermissionEntity | null>;

  findManyByUserId(id: string): Promise<$Enums.Permissions[]>;

  checkPermissionAlreadyExists(
    permission: UserPermissionEntity,
  ): Promise<UserPermissionEntity>;

  validatePermission(permission: $Enums.Permissions): Promise<void>;

  delete(userPermissionId: string): Promise<void>;
}
