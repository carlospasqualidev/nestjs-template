import { TPermissions } from './user-permission.interface';

export class UserPermissionEntity {
  id?: string;
  userId: string;
  permission: TPermissions;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: UserPermissionEntity) {
    Object.assign(this, data);
  }
}
