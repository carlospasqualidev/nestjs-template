import { IsString, IsEmail } from 'class-validator';

export class AccessSendEmailForRegistrationDTO {
  @IsString({
    message: 'O e-mail deve ser uma string.',
  })
  @IsEmail({}, { message: 'O e-mail deve ser válido.' })
  email: string;
}
