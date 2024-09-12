import { Inject, Injectable } from '@nestjs/common';

import { UserPermissionCreateDTO } from 'src/application/dtos/user-permission';
import { UserPermissionEntity } from 'src/domain/entities/user-permission.entity';
import { IUserPermissionRepository } from 'src/domain/repositories';

@Injectable()
export class UserPermissionCreateUseCase {
  @Inject('IUserPermissionRepository')
  private readonly userPermissionRepository: IUserPermissionRepository;

  public async execute(dto: UserPermissionCreateDTO) {
    const permissionEntity = new UserPermissionEntity(dto);

    const permission =
      await this.userPermissionRepository.create(permissionEntity);

    return { permission };
  }
}
