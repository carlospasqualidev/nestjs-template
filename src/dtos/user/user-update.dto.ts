import { IsString, IsOptional, IsEmail, IsNotEmpty } from 'class-validator';

export class UserUpdateDTO {
  @IsString({
    message: 'O id deve ser uma string',
  })
  @IsNotEmpty({ message: 'O id é obrigatório' })
  id: string;

  @IsString({
    message: 'O nome deve ser uma string',
  })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  image?: string | null;
}
