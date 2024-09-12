// IMPORTS
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
//#endregion

//#REGION DTOS
import {
  AccessDTO,
  AccessSendEmailForRegistrationDTO,
  AccessReturnDTO,
} from 'src/application/dtos/access';
//#endregion

//#REGION USE CASES
import {
  AccessLoginUseCase,
  AccessLogoutUseCase,
  AccessRefreshAccessTokenUseCase,
  AccessSendEmailForRegistrationUseCase,
} from 'src/application/use-cases/access';
//#endregions

@ApiTags('Authentication')
@Controller()
export class AccessController {
  //#region INJECTS
  @Inject(AccessSendEmailForRegistrationUseCase)
  private readonly accessSendEmailForRegistrationUseCase: AccessSendEmailForRegistrationUseCase;
  @Inject(AccessLoginUseCase)
  private readonly accessLoginUseCase: AccessLoginUseCase;
  @Inject(AccessLogoutUseCase)
  private readonly accessLogoutUseCase: AccessLogoutUseCase;
  @Inject(AccessRefreshAccessTokenUseCase)
  private readonly accessRefreshAccessTokenUseCase: AccessRefreshAccessTokenUseCase;
  //#endregion

  @HttpCode(200)
  @ApiResponse({
    status: 200,
  })
  @Post('/send-email-for-registration')
  async Create(@Body() dto: AccessSendEmailForRegistrationDTO) {
    return this.accessSendEmailForRegistrationUseCase.execute(dto);
  }

  @Post('/login')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: AccessReturnDTO,
  })
  async Login(@Body() dto: AccessDTO) {
    return this.accessLoginUseCase.execute(dto);
  }

  @Get('/logout')
  @ApiResponse({
    status: 200,
  })
  @ApiBearerAuth()
  async Logout(@Req() req: FastifyRequest) {
    return this.accessLogoutUseCase.execute(req);
  }

  @Get('/refresh')
  @ApiResponse({
    status: 200,
    type: AccessReturnDTO,
  })
  @ApiBearerAuth()
  async RefreshAccessToken(@Req() req: FastifyRequest) {
    return this.accessRefreshAccessTokenUseCase.execute(req);
  }
}
