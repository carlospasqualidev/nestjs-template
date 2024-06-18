import { IsString, IsOptional, IsEmail, IsNotEmpty } from 'class-validator';

export class UserCreateDTO {
  @IsString({
    message: 'O nome deve ser uma string.',
  })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  @IsString({
    message: 'O e-mail deve ser uma string.',
  })
  @IsEmail({}, { message: 'O e-mail deve ser válido.' })
  email: string;

  @IsString({ message: 'A imagem deve ser uma url do tipo string.' })
  @IsOptional()
  image?: string | null;

  @IsString({ message: 'A senha deve ser uma string.' })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  password: string;
}
