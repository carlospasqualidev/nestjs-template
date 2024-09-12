import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/domain/entities';

import { prisma } from 'src/infrastructure/database/prisma';
import { UserUpdateDTO } from 'src/application/dtos/user';
import { cryptography } from 'src/infrastructure/security/cryptography';
import { IUserRepository } from 'src/domain/repositories';
import {
  IFindOptions,
  ITakeAndPage,
} from 'src/domain/repositories/generics-repository.interface';
import { IUpdateRefreshToken } from 'src/domain/repositories/user-repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  //#region CREATE
  async create(data: UserEntity): Promise<UserEntity> {
    const password = await cryptography.hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        ...data,
        password,
        permissions: {
          create: {
            permission: 'user',
          },
        },
      },
    });
    return user;
  }
  //#endregion

  //#region FIND
  async findById(
    id: string,
    options: IFindOptions = { validate: true },
  ): Promise<UserEntity | undefined> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (options.validate && !user)
      throw new NotFoundException('Usuário não encontrado na base de dados.');

    return user;
  }

  async findByEmail(email: string, options: IFindOptions = { validate: true }) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (options.validate && !user)
      throw new NotFoundException('Usuário não encontrado na base de dados.');

    return user;
  }

  async findMany({
    page,
    take,
  }: ITakeAndPage): Promise<{ users: UserEntity[]; count: number } | []> {
    const [users, count] = await prisma.$transaction([
      prisma.user.findMany({
        take,
        skip: (page - 1) * take,
      }),
      prisma.user.count(),
    ]);

    return { users, count };
  }
  //#endregion

  //#region UPDATE
  async update(data: UserUpdateDTO): Promise<UserEntity> {
    const user = await prisma.user.update({
      data,
      where: {
        id: data.id,
      },
    });

    return user;
  }

  async updateRefreshToken({
    userId,
    refreshToken,
  }: IUpdateRefreshToken): Promise<void> {
    await prisma.user.update({
      data: {
        refreshToken,
      },
      where: {
        id: userId,
      },
    });
  }

  //#endregion

  //#region DELETE
  async delete(id: string) {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }
  //#endregion
}
