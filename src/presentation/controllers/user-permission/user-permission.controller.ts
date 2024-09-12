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
} from 'src/application/dtos/user-permission';

import {
  UserPermissionCreateUseCase,
  UserPermissionDeleteByIdUseCase,
} from 'src/application/use-cases/user-permission';
import { AuthGuard } from 'src/infrastructure/security/guards';

@ApiTags('User Permissions')
@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard('admin', 'user'))
export class UserPermissionController {
  //#region INJECTS
  @Inject(UserPermissionCreateUseCase)
  private readonly userPermissionCreateUseCase: UserPermissionCreateUseCase;
  @Inject(UserPermissionDeleteByIdUseCase)
  private readonly userPermissionDeleteByIdUseCase: UserPermissionDeleteByIdUseCase;
  //#endregion

  @Post()
  async Create(@Body() dto: UserPermissionCreateDTO) {
    return this.userPermissionCreateUseCase.execute(dto);
  }

  @Delete(':id')
  async DeleteById(@Param() dto: UserPermissionDeleteByIdDTO): Promise<void> {
    return this.userPermissionDeleteByIdUseCase.execute(dto);
  }
}
