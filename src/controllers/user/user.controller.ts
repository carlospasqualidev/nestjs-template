import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserCreateDTO } from 'src/dtos/user';

import { UserEntity } from 'src/entities/user.entity';
import { UserCreateUseCase } from 'src/use-cases/user';

@Controller()
export class UserController {
  @Inject(UserCreateUseCase)
  private readonly createProjectUseCase: UserCreateUseCase;

  @Post('/create')
  async Create(@Body() data: UserCreateDTO): Promise<UserEntity> {
    return this.createProjectUseCase.execute(data);
  }
  @Post('/update')
  async Update(@Body() data: UserCreateDTO): Promise<UserEntity> {
    return this.createProjectUseCase.execute(data);
  }
}
