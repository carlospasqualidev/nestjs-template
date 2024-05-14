import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import {
  IUpdateRefreshToken,
  IUserRepository,
  IUserRepositoryFindOptions,
} from './user-repository.interface';
import { prisma } from 'src/utilities/database';

@Injectable()
export class UserRepository implements IUserRepository {
  //#region CREATE
  async create(data: UserEntity): Promise<UserEntity> {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }
  //#endregion

  //#region FIND
  async findById(
    id: string,
    options: IUserRepositoryFindOptions = { validate: true },
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

  async findByEmail(
    email: string,
    options: IUserRepositoryFindOptions = { validate: true },
  ) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (options.validate && !user)
      throw new NotFoundException('Usuário não encontrado na base de dados.');

    return user;
  }
  //#endregion

  //#region UPDATE
  async update(data: UserEntity): Promise<UserEntity> {
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
