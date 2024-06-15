import { Inject, Injectable } from '@nestjs/common';
import { UserFindByIdDTO } from 'src/dtos/user';

import { UserRepository } from 'src/repositories/user';

@Injectable()
export class UserFindByIdUseCase {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;

  public async execute({ id }: UserFindByIdDTO) {
    return this.userRepository.findById(id);
  }
}
