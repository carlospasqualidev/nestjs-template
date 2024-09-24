// #region ENUMS
import { enums } from 'src/infrastructure/database/prisma';
// #endregion

// #region DOMAIN
import { UserPermissionEntity } from './user-permission.entity';
import { IFindOptions } from '../generic';
// #endregion

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
