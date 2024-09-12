import { Inject, Injectable } from '@nestjs/common';

import { UserEntity } from 'src/domain/entities';
import { UserCreateDTO } from 'src/application/dtos/user';
import { IUserRepository } from 'src/domain/repositories';

@Injectable()
export class UserCreateUseCase {
  @Inject('IUserRepository')
  private readonly userRepository: IUserRepository;

  public async execute(data: UserCreateDTO) {
    const user = new UserEntity(data);

    return this.userRepository.create(user);
  }
}
