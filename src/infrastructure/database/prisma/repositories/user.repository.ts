//#region IMPORTS
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';

import { prisma } from 'src/infrastructure/database/prisma';
import { ErrorCollector } from 'src/utilities/error';
//#endregion

//#region DTOS
import {
  UserCreateDTO,
  UserCreateReturnDTO,
  UserDeleteByIdDTO,
  UserFindByIdDTO,
  UserFindRefreshTokenByIdReturnDTO,
  UserFindByIdReturnDTO,
  UserUpdateDTO,
  UserFindPasswordByIdOrEmailDTO,
  UserFindPasswordByIdOrEmailReturnDTO,
} from 'src/application/dtos/user';

//#endregion

//#region DOMAIN
import {
  UserEntity,
  IUpdatePassword,
  IUpdateRefreshToken,
  IUserRepository,
} from 'src/domain/user';

import {
  IFindOptions,
  ITakeAndPage,
  IFindManyReturn,
} from 'src/domain/generic';
//#endregion

@Injectable()
export class UserRepository implements IUserRepository {
  @Inject()
  private errorCollector: ErrorCollector;

  //#region CREATE
  async create(dto: UserCreateDTO): Promise<UserCreateReturnDTO> {
    const otherUserWithEqualEmail = await this.findByEmail(dto.email, {
      validate: false,
    });

    if (otherUserWithEqualEmail) {
      this.errorCollector.add('Informe um email válido.');
    }

    const newUser = new UserEntity(dto);
    const errors = await newUser.validatePassword(dto.confirmPassword);
    this.errorCollector.add(errors);
    this.errorCollector.throwIfAny();

    await newUser.hashPassword();
    const user = await prisma.user.create({
      data: {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        image: newUser.image,
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
    dto: UserFindByIdDTO,
    options: IFindOptions = { validate: true },
  ): Promise<UserFindByIdReturnDTO | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: dto.id,
      },
    });

    if (options.validate && !user)
      throw new NotFoundException('Usuário não encontrado na base de dados.');

    return user;
  }

  async findByEmail(
    email: string,
    options: IFindOptions = { validate: true },
  ): Promise<UserFindByIdReturnDTO | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (options.validate && !user)
      throw new NotFoundException('Usuário não encontrado na base de dados.');

    return user;
  }

  async findRefreshTokenById(
    dto: UserFindByIdDTO,
    options: IFindOptions = { validate: true },
  ): Promise<UserFindRefreshTokenByIdReturnDTO | null> {
    const user = await prisma.user.findUnique({
      select: {
        id: true,
        refreshToken: true,
      },
      where: {
        id: dto.id,
      },
    });

    if (options.validate && !user)
      throw new NotFoundException('Usuário não encontrado na base de dados.');

    return user;
  }

  async findPasswordByIdOrEmail(
    dto: UserFindPasswordByIdOrEmailDTO,
    options: IFindOptions = { validate: true },
  ): Promise<UserFindPasswordByIdOrEmailReturnDTO | null> {
    if (!dto.id && !dto.email)
      throw new BadRequestException('Informe o id ou email do usuário.');

    const where = dto.id ? { id: dto.id } : { email: dto.email };

    const user = await prisma.user.findUnique({
      select: {
        id: true,
        password: true,
      },

      where,
    });

    if (options.validate && !user)
      throw new NotFoundException('Usuário não encontrado na base de dados.');

    return user;
  }

  async findMany(filters: ITakeAndPage): Promise<IFindManyReturn<UserEntity>> {
    const [data, count] = await prisma.$transaction([
      prisma.user.findMany({
        take: filters.take,
        skip: (filters.page - 1) * filters.take,
      }),
      prisma.user.count(),
    ]);

    return { data, count };
  }
  //#endregion

  //#region UPDATE
  async update(data: UserUpdateDTO): Promise<UserEntity> {
    await this.findById({ id: data.id });

    const user = await prisma.user.update({
      data,
      where: {
        id: data.id,
      },
    });

    return user;
  }

  async updateRefreshToken(data: IUpdateRefreshToken): Promise<void> {
    await this.findById({ id: data.userId });

    await prisma.user.update({
      data: {
        refreshToken: data.refreshToken,
      },
      where: {
        id: data.userId,
      },
    });
  }

  async updatePassword(dto: IUpdatePassword): Promise<void> {
    const user = await prisma.user.findUnique({
      where: {
        id: dto.id,
      },
    });

    const newUser = new UserEntity(user);
    newUser.password = dto.password;
    const isInvalid = await newUser.validatePassword(dto.confirmPassword);

    if (isInvalid) {
      throw new BadRequestException(isInvalid);
    }

    await newUser.hashPassword();

    await prisma.user.update({
      data: {
        password: newUser.password,
      },
      where: {
        id: dto.id,
      },
    });
  }

  //#endregion

  //#region DELETE
  async deleteById(dto: UserDeleteByIdDTO): Promise<void> {
    await this.findById(dto);

    await prisma.user.delete({
      where: {
        id: dto.id,
      },
    });
  }
  //#endregion
}
