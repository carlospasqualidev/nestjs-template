import { IsString, IsNotEmpty } from 'class-validator';

export class UserPermissionDeleteByIdDTO {
  @IsString({
    message: 'O id deve ser uma string',
  })
  @IsNotEmpty({ message: 'O id é obrigatório' })
  id: string;
}
