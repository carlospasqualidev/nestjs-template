import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';

import {
  AuthenticationDTO,
  AuthenticationReturnDTO,
} from 'src/dtos/authentication';

import {
  AuthenticationLoginUseCase,
  AuthenticationLogoutUseCase,
  AuthenticationRefreshAccessTokenUseCase,
} from 'src/use-cases/authentication';

@ApiTags('Authentication')
@Controller()
export class AuthenticationController {
  @Inject(AuthenticationLoginUseCase)
  private readonly authenticationLoginUseCase: AuthenticationLoginUseCase;
  @Inject(AuthenticationRefreshAccessTokenUseCase)
  private readonly authenticationRefreshAccessTokenUseCase: AuthenticationRefreshAccessTokenUseCase;
  @Inject(AuthenticationLogoutUseCase)
  private readonly authenticationLogoutUseCase: AuthenticationLogoutUseCase;

  @Post('/login')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: AuthenticationReturnDTO,
  })
  async Login(@Body() dto: AuthenticationDTO) {
    return this.authenticationLoginUseCase.execute(dto);
  }

  @Get('/logout')
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @ApiBearerAuth()
  async Logout(@Req() req: FastifyRequest) {
    return this.authenticationLogoutUseCase.execute(req);
  }

  @Get('/refresh')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: AuthenticationReturnDTO,
  })
  @ApiBearerAuth()
  async RefreshAccessToken(@Req() req: FastifyRequest) {
    return this.authenticationRefreshAccessTokenUseCase.execute(req);
  }
}
