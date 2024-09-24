import { IsString, IsOptional, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDTO {
  @IsString({
    message: 'O token deve ser uma string.',
  })
  @IsNotEmpty({ message: 'O token é obrigatório.' })
  token: string;

  @IsString({
    message: 'O nome deve ser uma string.',
  })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  @IsString({ message: 'A imagem deve ser uma url do tipo string.' })
  @IsOptional()
  image?: string | null;

  @IsString({ message: 'A senha deve ser uma string.' })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;

  @IsString({ message: 'A confirmação de senha deve ser uma string.' })
  @MinLength(8, {
    message: 'A confirmação de senha deve ter no mínimo 8 caracteres',
  })
  @IsNotEmpty({ message: 'A confirmação de senha é obrigatória.' })
  confirmPassword: string;
}
