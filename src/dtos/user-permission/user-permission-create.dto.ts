import { IsString, IsNotEmpty } from 'class-validator';
import { TPermissions } from 'src/entities/user-permission';

export class UserPermissionCreateDTO {
  @IsString({
    message: 'A permissão deve ser uma string',
  })
  @IsNotEmpty({ message: 'A permissão é obrigatória' })
  permission: TPermissions;

  @IsString({
    message: 'O ID do usuário deve ser uma string',
  })
  @IsNotEmpty({ message: 'O ID do usuário é obrigatório' })
  userId: TPermissions;
}
