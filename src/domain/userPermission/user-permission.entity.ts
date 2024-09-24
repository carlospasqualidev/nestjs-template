//#region ENUMS
import { enums } from 'src/infrastructure/database/prisma';
// #endregion

export class UserPermissionEntity {
  id?: string;
  permission: enums.Permissions;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: UserPermissionEntity) {
    Object.assign(this, data);
  }
}
