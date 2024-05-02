import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/utilities/database';
import { UserEntity } from 'src/entities/user.entity';
import { IUserRepository } from './user-repository.interface';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  private readonly prisma = new Prisma();

  constructor() {
    this.prisma = new Prisma();
  }

  async create(data: UserEntity): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data,
    });
    return user;
  }

  async findById(id: string): Promise<UserEntity> {
    const user = this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async findByEmail(email: string): Promise<any> {
    const user = this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async update(data: UserEntity): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      data,
      where: {
        id: data.id,
      },
    });

    return user;
  }
}
