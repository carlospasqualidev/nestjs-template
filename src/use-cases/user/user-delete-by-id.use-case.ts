import { Inject, Injectable } from '@nestjs/common';
import { UserDeleteByIdDTO } from 'src/dtos/user';

import { UserRepository } from 'src/repositories/user';

@Injectable()
export class UserDeleteByIdUseCase {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;

  public async execute({ id }: UserDeleteByIdDTO) {
    return this.userRepository.delete(id);
  }
}
