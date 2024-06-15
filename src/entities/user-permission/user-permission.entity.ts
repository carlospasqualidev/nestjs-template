import { $Enums } from '@prisma/client';
// import { EnumPermissions } from './user-permission.interface';

export class UserPermissionEntity {
  id?: string;
  permission: $Enums.Permissions;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: UserPermissionEntity) {
    Object.assign(this, data);
  }
}
