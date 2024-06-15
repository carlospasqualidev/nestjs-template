import { Inject, Injectable } from '@nestjs/common';

import { UserPermissionRepository } from 'src/repositories/user-permission';
import { UserPermissionCreateDTO } from 'src/dtos/user-permission';
import { UserPermissionEntity } from 'src/entities/user-permission';

@Injectable()
export class UserPermissionCreateUseCase {
  @Inject(UserPermissionRepository)
  private readonly userPermissionRepository: UserPermissionRepository;

  public async execute(dto: UserPermissionCreateDTO) {
    const permissionEntity = new UserPermissionEntity(dto);

    const permission =
      await this.userPermissionRepository.create(permissionEntity);

    return { permission };
  }
}
