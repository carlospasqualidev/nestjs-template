import { Inject, Injectable } from '@nestjs/common';

import { UserRepository } from 'src/repositories/user';
import { UserUpdateDTO } from 'src/dtos/user';

@Injectable()
export class UserUpdateUseCase {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;

  public async execute(data: UserUpdateDTO) {
    return this.userRepository.update(data);
  }
}
