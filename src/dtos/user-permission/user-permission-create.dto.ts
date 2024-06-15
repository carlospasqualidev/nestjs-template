import { $Enums } from '@prisma/client';
import { IsString, IsNotEmpty } from 'class-validator';
// import { EnumPermissions } from 'src/entities/user-permission';

export class UserPermissionCreateDTO {
  @IsString({
    message: 'A permissão deve ser uma string',
  })
  @IsNotEmpty({ message: 'A permissão é obrigatória' })
  permission: $Enums.Permissions;

  @IsString({
    message: 'O ID do usuário deve ser uma string',
  })
  @IsNotEmpty({ message: 'O ID do usuário é obrigatório' })
  userId: string;
}
