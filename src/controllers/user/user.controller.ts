import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  UserCreateDTO,
  UserDeleteByIdDTO,
  UserFindByIdDTO,
  UserUpdateDTO,
} from 'src/dtos/user';

import { UserEntity } from 'src/entities/user/user.entity';
import {
  UserCreateUseCase,
  UserDeleteByIdUseCase,
  UserFindByIdUseCase,
  UserUpdateUseCase,
} from 'src/use-cases/user';
import { AuthGuard } from 'src/utilities/guards';

@ApiTags('User')
@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard('admin', 'user'))
export class UserController {
  @Inject(UserCreateUseCase)
  private readonly userCreateUseCase: UserCreateUseCase;
  @Inject(UserUpdateUseCase)
  private readonly userUpdateUseCase: UserUpdateUseCase;
  @Inject(UserFindByIdUseCase)
  private readonly userFindByIdUseCase: UserFindByIdUseCase;
  @Inject(UserDeleteByIdUseCase)
  private readonly userDeleteByIdUseCase: UserDeleteByIdUseCase;

  @Post()
  async Create(@Body() dto: UserCreateDTO): Promise<UserEntity> {
    return this.userCreateUseCase.execute(dto);
  }

  @Put()
  async Update(@Body() dto: UserUpdateDTO): Promise<UserEntity> {
    return this.userUpdateUseCase.execute(dto);
  }

  @Get(':id')
  async FindById(@Param() dto: UserFindByIdDTO): Promise<UserEntity> {
    return this.userFindByIdUseCase.execute(dto);
  }

  @Delete(':id')
  async DeleteById(@Param() dto: UserDeleteByIdDTO): Promise<void> {
    return this.userDeleteByIdUseCase.execute(dto);
  }
}
