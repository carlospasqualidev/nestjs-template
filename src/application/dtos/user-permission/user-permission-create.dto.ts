import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { enums } from 'src/infrastructure/database/prisma';

export class UserPermissionCreateDTO {
  @ApiProperty({
    description: 'A permissão deve ser uma string',
    enum: enums.Permissions,
    example: enums.Permissions.admin,
  })
  @IsEnum(enums.Permissions, {
    message: `A permissão deve ser uma das seguintes opções: ${Object.keys(enums.Permissions)}.`,
  })
  permission: enums.Permissions;

  @ApiProperty({
    description: 'O ID do usuário deve ser uma string',
    example: 'user123',
  })
  @IsString({
    message: 'O ID do usuário deve ser uma string',
  })
  @IsNotEmpty({ message: 'O ID do usuário é obrigatório' })
  userId: string;
}
