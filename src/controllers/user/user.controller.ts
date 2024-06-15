import { Body, Controller, Inject, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserCreateDTO } from 'src/dtos/user';

import { UserEntity } from 'src/entities/user/user.entity';
import { UserCreateUseCase } from 'src/use-cases/user';
import { AuthGuard } from 'src/utilities/guards/authGuard';

@ApiTags('User')
@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard('admin', 'user'))
export class UserController {
  @Inject(UserCreateUseCase)
  private readonly createProjectUseCase: UserCreateUseCase;

  @Post()
  async Create(@Body() data: UserCreateDTO): Promise<UserEntity> {
    return this.createProjectUseCase.execute(data);
  }

  @Put()
  async Update(@Body() data: UserCreateDTO): Promise<UserEntity> {
    return this.createProjectUseCase.execute(data);
  }
}
