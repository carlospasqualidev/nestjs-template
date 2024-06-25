import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
// import { EnumPermissions } from 'src/entities/user-permission';

export class UserPermissionCreateDTO {
  @ApiProperty({
    description: 'A permissão deve ser uma string',
    enum: $Enums.Permissions,
    example: $Enums.Permissions.admin,
  })
  @IsEnum($Enums.Permissions, {
    message: `A permissão deve ser uma das seguintes opções: ${Object.keys($Enums.Permissions)}.`,
  })
  permission: $Enums.Permissions;

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
