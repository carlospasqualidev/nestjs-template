import { Inject, Injectable } from '@nestjs/common';
import { UserFindManyDTO } from 'src/application/dtos/user';
import { IUserRepository } from 'src/domain/repositories';

@Injectable()
export class UserFindManyUseCase {
  @Inject('IUserRepository')
  private readonly userRepository: IUserRepository;

  public async execute(filter: UserFindManyDTO) {
    return this.userRepository.findMany({
      page: filter.page,
      take: filter.take,
    });
  }
}
