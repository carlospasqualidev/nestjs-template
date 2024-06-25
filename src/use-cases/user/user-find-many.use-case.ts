import { Inject, Injectable } from '@nestjs/common';
import { UserFindManyDTO } from 'src/dtos/user';
import { UserRepository } from 'src/repositories/user';

@Injectable()
export class UserFindManyUseCase {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;

  public async execute(filter: UserFindManyDTO) {
    return this.userRepository.findMany({
      page: filter.page,
      take: filter.take,
    });
  }
}
