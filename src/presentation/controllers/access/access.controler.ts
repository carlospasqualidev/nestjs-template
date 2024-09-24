//#region IMPORTS
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

//#region DTOS
import {
  AccessDTO,
  AccessReturnDTO,
  AccessUpdatePasswordDTO,
  AccessSendEmailForUpdatePasswordDTO,
} from 'src/application/dtos/access';
//#endregion

//#region USE CASES
import {
  AccessLoginUseCase,
  AccessLogoutUseCase,
  AccessRefreshAccessTokenUseCase,
  AccessUpdatePasswordUseCase,
  AccessSendEmailForUpdatePasswordUseCase,
} from 'src/application/use-cases/access';
//#endregion

@ApiTags('Access')
@Controller()
export class AccessController {
  //#region INJECTS
  @Inject(AccessLoginUseCase)
  private readonly accessLoginUseCase: AccessLoginUseCase;
  @Inject(AccessLogoutUseCase)
  private readonly accessLogoutUseCase: AccessLogoutUseCase;
  @Inject(AccessRefreshAccessTokenUseCase)
  private readonly accessRefreshAccessTokenUseCase: AccessRefreshAccessTokenUseCase;
  @Inject(AccessSendEmailForUpdatePasswordUseCase)
  private readonly accessSendEmailForUpdatePasswordUseCase: AccessSendEmailForUpdatePasswordUseCase;
  @Inject(AccessUpdatePasswordUseCase)
  private readonly accessUpdatePasswordUseCase: AccessUpdatePasswordUseCase;
  //#endregion

  @Post('/login')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: AccessReturnDTO,
  })
  async Login(@Body() dto: AccessDTO) {
    return this.accessLoginUseCase.execute(dto);
  }

  @Post('/update-password')
  @HttpCode(200)
  async UpdatePassword(@Body() dto: AccessUpdatePasswordDTO) {
    return this.accessUpdatePasswordUseCase.execute(dto);
  }

  @Post('/send-update-password-email')
  @HttpCode(200)
  async SendUpdatePasswordEmail(
    @Body() dto: AccessSendEmailForUpdatePasswordDTO,
  ) {
    return this.accessSendEmailForUpdatePasswordUseCase.execute(dto);
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
