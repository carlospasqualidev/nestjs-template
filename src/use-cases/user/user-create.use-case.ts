import { Inject, Injectable } from '@nestjs/common';

import { UserRepository } from 'src/repositories/user';
import { UserEntity } from 'src/entities/user';
import { UserCreateDTO } from 'src/dtos/user';

@Injectable()
export class UserCreateUseCase {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;

  public async execute(data: UserCreateDTO) {
    const user = new UserEntity(data);

    return this.userRepository.create(user);
  }
}
