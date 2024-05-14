import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';

import {
  AuthenticationDTO,
  AuthenticationReturnDTO,
} from 'src/dtos/authentication';

import {
  AuthenticationLoginUseCase,
  AuthenticationRefreshAccessTokenUseCase,
} from 'src/use-cases/authentication';

@ApiTags('Authentication')
@Controller()
export class AuthenticationController {
  @Inject(AuthenticationLoginUseCase)
  private readonly authenticationLoginUseCase: AuthenticationLoginUseCase;
  @Inject(AuthenticationRefreshAccessTokenUseCase)
  private readonly authenticationRefreshAccessTokenUseCase: AuthenticationRefreshAccessTokenUseCase;

  @Post('/login')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: AuthenticationReturnDTO,
  })
  async Login(@Body() dto: AuthenticationDTO) {
    return this.authenticationLoginUseCase.execute(dto);
  }

  @Get('/refresh-access-token')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: AuthenticationReturnDTO,
  })
  @ApiBearerAuth()
  async RefreshAccessToken(
    @Req() req: FastifyRequest,
  ): Promise<AuthenticationReturnDTO> {
    return this.authenticationRefreshAccessTokenUseCase.execute(req);
  }
}
