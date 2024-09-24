import {
  IsString,
  IsOptional,
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

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
  @MinLength(8, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;

  @IsString({ message: 'A confirmação de senha deve ser uma string.' })
  @MinLength(8, {
    message: 'A confirmação de senha deve ter no mínimo 6 caracteres',
  })
  @IsNotEmpty({ message: 'A confirmação de senha é obrigatória.' })
  confirmPassword: string;
}
