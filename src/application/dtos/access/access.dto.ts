import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccessDTO {
  @IsString({ message: 'O email deve ser uma string.' })
  @IsEmail({}, { message: 'O email deve ser um email válido.' })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  @ApiProperty({
    example: 'admin@gmail.com',
  })
  email: string;

  @IsString({ message: 'A senha deve ser uma string.' })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  @ApiProperty({
    example: '123123123',
  })
  password: string;
}
