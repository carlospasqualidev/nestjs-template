import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserFindPasswordByIdOrEmailDTO {
  @IsString({
    message: 'O id deve ser uma string',
  })
  @IsOptional()
  id?: string;

  @IsOptional()
  @IsEmail({}, { message: 'O e-mail deve ser válido.' })
  email?: string;
}
