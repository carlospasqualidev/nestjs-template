import { Inject, Injectable } from '@nestjs/common';

import { UserPrismaRepository } from 'src/repositories/user/user-prisma.repository';
import { UserEntity } from 'src/entities/user.entity';
import { Cryptography } from 'src/utilities/cryptography/cryptography';

@Injectable()
export class UserCreateUseCase {
  @Inject(UserPrismaRepository)
  private readonly userPrismaRepository: UserPrismaRepository;

  async execute(data: UserEntity) {
    data.password = await Cryptography.hashPassword(data.password);

    const user = new UserEntity(data);

    return this.userPrismaRepository.create(user);
  }
}
