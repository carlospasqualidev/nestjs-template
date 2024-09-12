import { enums } from 'src/infrastructure/database/prisma';
import { UserPermissionEntity } from '../entities/user-permission.entity';
import { IFindOptions } from './generics-repository.interface';

export interface IUserPermissionRepository {
  create(permission: UserPermissionEntity): Promise<UserPermissionEntity>;

  findById(
    id: string,
    options?: IFindOptions,
  ): Promise<UserPermissionEntity | null>;

  findManyByUserId(id: string): Promise<enums.Permissions[]>;

  checkPermissionAlreadyExists(
    permission: UserPermissionEntity,
  ): Promise<UserPermissionEntity>;

  validatePermission(permission: enums.Permissions): Promise<void>;

  delete(userPermissionId: string): Promise<void>;
}
