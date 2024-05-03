import { Inject, Injectable } from '@nestjs/common';

import { UserPrismaRepository } from 'src/repositories/user';
import { UserEntity } from 'src/entities';
import { Cryptography } from 'src/utilities/cryptography';
import { UserCreateDTO } from 'src/dtos/user';

@Injectable()
export class UserCreateUseCase {
  @Inject(UserPrismaRepository)
  private readonly userPrismaRepository: UserPrismaRepository;

  async execute(data: UserCreateDTO) {
    data.password = await Cryptography.hashPassword(data.password);

    const user = new UserEntity(data);

    return this.userPrismaRepository.create(user);
  }
}
