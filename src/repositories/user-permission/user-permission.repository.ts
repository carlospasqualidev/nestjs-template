import {
  EnumPermissions,
  UserPermissionEntity,
} from 'src/entities/user-permission';
import {
  IFindOptions,
  IUserPermissionRepository,
} from './user-permission.interface';
import { prisma } from 'src/utilities/database';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class UserPermissionRepository implements IUserPermissionRepository {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;

  //#region CREATE
  async create(
    permission: UserPermissionEntity,
  ): Promise<UserPermissionEntity> {
    await this.userRepository.findById(permission.userId);

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

  async validadePermission(permission: EnumPermissions): Promise<void> {
    if (!Object.values(EnumPermissions).includes(permission))
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

  //#endregion

  //#region DELETE
  async delete(userPermissionId: string): Promise<void> {
    await this.findById(userPermissionId);

    await prisma.userPermission.delete({
      where: {
        id: userPermissionId,
      },
    });
  }
  //#endregion
}
