import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { UserCreateUseCase } from 'src/use-cases/user/user-create.use-case';

@Controller()
export class AppController {
  @Inject(UserCreateUseCase)
  private readonly createProjectUseCase: UserCreateUseCase;

  @Post('/create/user')
  async Create(@Body() data: UserEntity): Promise<UserEntity> {
    return this.createProjectUseCase.execute(data);
  }
}
