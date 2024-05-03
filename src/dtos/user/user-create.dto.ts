import { IsString, IsOptional, IsEmail, IsNotEmpty } from 'class-validator';

export class UserCreateDTO {
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

  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  password: string;
  @IsString()
  @IsNotEmpty({ message: 'DIABO E NECESSARIO' })
  diabo: string;
}
