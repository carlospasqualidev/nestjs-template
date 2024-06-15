import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  AuthenticationDTO,
  AuthenticationReturnDTO,
} from 'src/dtos/authentication';

import {
  AuthenticationLoginUseCase,
  AuthenticationLogoutUseCase,
  AuthenticationRefreshAccessTokenUseCase,
} from 'src/use-cases/authentication';

@ApiTags('User Permissions')
@Controller()
export class UserPermissionController {
  @Inject(AuthenticationLoginUseCase)
  private readonly authenticationLoginUseCase: AuthenticationLoginUseCase;
  @Inject(AuthenticationRefreshAccessTokenUseCase)
  private readonly authenticationRefreshAccessTokenUseCase: AuthenticationRefreshAccessTokenUseCase;
  @Inject(AuthenticationLogoutUseCase)
  private readonly authenticationLogoutUseCase: AuthenticationLogoutUseCase;

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: AuthenticationReturnDTO,
  })
  @ApiBearerAuth()
  async Create(@Body() dto: AuthenticationDTO) {
    return this.authenticationLoginUseCase.execute(dto);
  }
}
