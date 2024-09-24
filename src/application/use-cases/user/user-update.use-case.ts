import { Inject, Injectable } from '@nestjs/common';
import { UserUpdateDTO } from 'src/application/dtos/user';
import { IUserRepository } from 'src/domain/user';

@Injectable()
export class UserUpdateUseCase {
  @Inject('IUserRepository')
  private readonly userRepository: IUserRepository;

  public async execute(data: UserUpdateDTO) {
    return this.userRepository.update(data);
  }
}
