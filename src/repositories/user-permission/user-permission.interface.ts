import {
  EnumPermissions,
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

  checkPermissionAlreadyExists(
    permission: UserPermissionEntity,
  ): Promise<UserPermissionEntity>;

  validatePermission(permission: EnumPermissions): Promise<void>;

  delete(userPermissionId: string): Promise<void>;
}