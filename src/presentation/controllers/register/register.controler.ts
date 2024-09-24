// IMPORTS
import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
//#endregion

//#REGION DTO
import { RegisterSendEmailForRegistrationUserDTO } from 'src/application/dtos/register';
import { RegisterUserDTO } from 'src/application/dtos/register/registerUser.dto';
//#endregion

//#REGION USE CASES
import {
  RegisterSendEmailForRegistrationUseCase,
  RegisterUser,
} from 'src/application/use-cases/register';
//#endregions

@ApiTags('Register')
@Controller()
export class RegisterController {
  //#region INJECTS
  @Inject(RegisterSendEmailForRegistrationUseCase)
  private readonly accessSendEmailForRegistrationUseCase: RegisterSendEmailForRegistrationUseCase;

  @Inject(RegisterUser)
  private readonly registerUser: RegisterUser;
  //#endregion

  @HttpCode(200)
  @ApiResponse({
    status: 200,
  })
  @Post('/send-email')
  async SendEmail(@Body() dto: RegisterSendEmailForRegistrationUserDTO) {
    return this.accessSendEmailForRegistrationUseCase.execute(dto);
  }

  @HttpCode(201)
  @ApiResponse({
    status: 201,
  })
  @Post('/create')
  async Create(@Body() dto: RegisterUserDTO) {
    return this.registerUser.execute(dto);
  }
}
