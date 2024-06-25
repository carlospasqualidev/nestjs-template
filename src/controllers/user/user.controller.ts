import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  UserCreateDTO,
  UserDeleteByIdDTO,
  UserFindByIdDTO,
  UserFindManyDTO,
  UserUpdateDTO,
} from 'src/dtos/user';

import {
  UserCreateUseCase,
  UserDeleteByIdUseCase,
  UserFindByIdUseCase,
  UserUpdateUseCase,
} from 'src/use-cases/user';
import { UserFindManyUseCase } from 'src/use-cases/user/user-find-many.use-case';
import { AuthGuard } from 'src/utilities/guards';

@ApiTags('User')
@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard('admin'))
export class UserController {
  @Inject(UserCreateUseCase)
  private readonly userCreateUseCase: UserCreateUseCase;
  @Inject(UserUpdateUseCase)
  private readonly userUpdateUseCase: UserUpdateUseCase;
  @Inject(UserFindByIdUseCase)
  private readonly userFindByIdUseCase: UserFindByIdUseCase;
  @Inject(UserDeleteByIdUseCase)
  private readonly userDeleteByIdUseCase: UserDeleteByIdUseCase;
  @Inject(UserFindManyUseCase)
  private readonly userFindManyUseCase: UserFindManyUseCase;

  @Post()
  async Create(@Body() dto: UserCreateDTO) {
    return this.userCreateUseCase.execute(dto);
  }

  @Put()
  async Update(@Body() dto: UserUpdateDTO) {
    return this.userUpdateUseCase.execute(dto);
  }

  @Get()
  async FindMany(@Query() dto: UserFindManyDTO) {
    return this.userFindManyUseCase.execute(dto);
  }

  @Get(':id')
  async FindById(@Param() dto: UserFindByIdDTO) {
    return this.userFindByIdUseCase.execute(dto);
  }

  @Delete(':id')
  async DeleteById(@Param() dto: UserDeleteByIdDTO) {
    return this.userDeleteByIdUseCase.execute(dto);
  }
}
