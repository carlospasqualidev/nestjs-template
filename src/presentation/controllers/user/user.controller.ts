import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/infrastructure/security/guards';

@ApiTags('User')
@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard('admin'))
export class UserController {
  //#region INJECTS
  // @Inject(UserSendEmailForRegistrationUseCase)
  // private readonly userSendEmailForRegistrationDTO: UserSendEmailForRegistrationUseCase;
  // //#endregion
  // @Post()
  // async Create(@Body() dto: UserSendEmailForRegistrationDTO) {
  //   return this.userSendEmailForRegistrationDTO.execute(dto);
  // }
  // @Put()
  // async Update(@Body() dto: UserUpdateDTO) {
  //   return this.userUpdateUseCase.execute(dto);
  // }
  // @Get()
  // async FindMany(@Query() dto: UserFindManyDTO) {
  //   return this.userFindManyUseCase.execute(dto);
  // }
  // @Get(':id')
  // async FindById(@Param() dto: UserFindByIdDTO) {
  //   return this.userFindByIdUseCase.execute(dto);
  // }
  // @Delete(':id')
  // async DeleteById(@Param() dto: UserDeleteByIdDTO) {
  //   return this.userDeleteByIdUseCase.execute(dto);
  // }
}
