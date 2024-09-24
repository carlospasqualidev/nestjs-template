//#region IMPORTS
import { IsString, IsEmail } from 'class-validator';
//#endregion

export class AccessSendEmailForUpdatePasswordDTO {
  @IsString({
    message: 'O e-mail deve ser uma string.',
  })
  @IsEmail({}, { message: 'O e-mail deve ser válido.' })
  email: string;

  @IsString({
    message: 'A url de redirecionamento deve ser uma string.',
  })
  redirectUrl: string;
}
