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

  @IsString({
    message: 'O e-mail deve ser uma string.',
  })
  @IsEmail({}, { message: 'O e-mail deve ser válido.' })
  email: string;

  @IsString({ message: 'A imagem deve ser uma url do tipo string.' })
  @IsOptional()
  image?: string | null;
}
