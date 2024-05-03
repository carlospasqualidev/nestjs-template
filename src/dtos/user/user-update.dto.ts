import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, IsNotEmpty } from 'class-validator';

export class UserUpdateDTO {
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

  @ApiProperty({
    description: `A list of user's roles`,
    example: ['admin'],
  })
  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  password: string;
}
