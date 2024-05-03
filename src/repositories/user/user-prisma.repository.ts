import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/utilities/database';
import { UserEntity } from 'src/entities/user.entity';
import { IUserRepository } from './user-repository.interface';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  async create(data: UserEntity): Promise<UserEntity> {
    const user = await Prisma.user.create({
      data,
    });
    return user;
  }

  async findById(id: string): Promise<UserEntity> {
    const user = Prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async findByEmail(email: string): Promise<any> {
    const user = Prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async update(data: UserEntity): Promise<UserEntity> {
    const user = await Prisma.user.update({
      data,
      where: {
        id: data.id,
      },
    });

    return user;
  }
}
