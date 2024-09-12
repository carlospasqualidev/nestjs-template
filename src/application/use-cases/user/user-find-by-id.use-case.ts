import { Inject, Injectable } from '@nestjs/common';
import { UserFindByIdDTO } from 'src/application/dtos/user';
import { IUserRepository } from 'src/domain/repositories';

@Injectable()
export class UserFindByIdUseCase {
  @Inject('IUserRepository')
  private readonly userRepository: IUserRepository;

  public async execute({ id }: UserFindByIdDTO) {
    return this.userRepository.findById(id);
  }
}
