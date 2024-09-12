import { enums, prisma } from 'src/infrastructure/database/prisma';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IUserPermissionRepository,
  IUserRepository,
} from 'src/domain/repositories';
import { UserPermissionEntity } from 'src/domain/entities/user-permission.entity';
import { IFindOptions } from 'src/domain/repositories/generics-repository.interface';

@Injectable()
export class UserPermissionRepository implements IUserPermissionRepository {
  @Inject('IUserRepository')
  private readonly userRepository: IUserRepository;

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

  async validatePermission(permission: enums.Permissions): Promise<void> {
    if (!Object.values(enums.Permissions).includes(permission))
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

  async findManyByUserId(id: string): Promise<enums.Permissions[]> {
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
