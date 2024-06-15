import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import {
  UserPermissionCreateDTO,
  UserPermissionDeleteByIdDTO,
} from 'src/dtos/user-permission';

import {
  UserPermissionCreateUseCase,
  UserPermissionDeleteByIdUseCase,
} from 'src/use-cases/user-permission';
import { AuthGuard } from 'src/utilities/guards/authGuard';

@ApiTags('User Permissions')
@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard('admin', 'user'))
export class UserPermissionController {
  @Inject(UserPermissionCreateUseCase)
  private readonly userPermissionCreateUseCase: UserPermissionCreateUseCase;
  @Inject(UserPermissionDeleteByIdUseCase)
  private readonly userPermissionDeleteByIdUseCase: UserPermissionDeleteByIdUseCase;

  @Post()
  async Create(@Body() dto: UserPermissionCreateDTO) {
    return this.userPermissionCreateUseCase.execute(dto);
  }

  @Delete(':id')
  async DeleteById(@Param() dto: UserPermissionDeleteByIdDTO): Promise<void> {
    return this.userPermissionDeleteByIdUseCase.execute(dto);
  }
}
