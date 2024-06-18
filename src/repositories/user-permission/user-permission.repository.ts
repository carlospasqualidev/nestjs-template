import {
  // EnumPermissions,
  UserPermissionEntity,
} from 'src/entities/user-permission';
import {
  IFindOptions,
  IUserPermissionRepository,
} from './user-permission.interface';
import { prisma } from 'src/utilities/database';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { $Enums } from '@prisma/client';

@Injectable()
export class UserPermissionRepository implements IUserPermissionRepository {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;

  //#region CREATE
  async create(
    permission: UserPermissionEntity,
  ): Promise<UserPermissionEntity> {
    await this.userRepository.findById(permission.userId);
    await this.validatePermission(permission.permission);
    await this.checkPermissionAlreadyExists(permission);

    const userPermission = await prisma.userPermission.create({
      data: permission,
    });

    return userPermission;
  }

  //#endregion

  //#region FIND

  async findById(
    id: string,
    options: IFindOptions = { validate: true },
  ): Promise<UserPermissionEntity | undefined> {
    const permission = await prisma.userPermission.findUnique({
      where: {
        id,
      },
    });

    if (options.validate && !permission)
      throw new NotFoundException('Permissão não encontrada na base de dados.');

    return permission;
  }

  async validatePermission(permission: $Enums.Permissions): Promise<void> {
    if (!Object.values($Enums.Permissions).includes(permission))
      throw new NotFoundException('Permissão inválida.');
  }

  async checkPermissionAlreadyExists(
    permission: UserPermissionEntity,
  ): Promise<UserPermissionEntity> {
    const userPermission = await prisma.userPermission.findFirst({
      where: {
        userId: permission.userId,
        permission: permission.permission,
      },
    });

    if (userPermission)
      throw new NotFoundException(
        'Permissão já cadastrada para o usuário informado.',
      );

    return userPermission;
  }

  async findManyByUserId(id: string): Promise<$Enums.Permissions[]> {
    const userPermissionsBase = await prisma.userPermission.findMany({
      where: {
        userId: id,
      },
    });

    const userPermissions = userPermissionsBase.map(
      (permission) => permission.permission,
    );

    return userPermissions;
  }

  //#endregion

  //#region DELETE
  async delete(id: string): Promise<void> {
    await this.findById(id);

    await prisma.userPermission.delete({
      where: {
        id,
      },
    });
  }

  //#endregion
}
