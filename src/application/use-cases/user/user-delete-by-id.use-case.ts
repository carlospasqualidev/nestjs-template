import { Inject, Injectable } from '@nestjs/common';
import { UserDeleteByIdDTO } from 'src/application/dtos/user';
import { IUserRepository } from 'src/domain/repositories';

@Injectable()
export class UserDeleteByIdUseCase {
  @Inject('IUserRepository')
  private readonly userRepository: IUserRepository;

  public async execute({ id }: UserDeleteByIdDTO) {
    return this.userRepository.delete(id);
  }
}
