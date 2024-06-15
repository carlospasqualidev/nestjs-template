import { Inject, Injectable } from '@nestjs/common';
import { UserPermissionDeleteByIdDTO } from 'src/dtos/user-permission';
import { UserPermissionRepository } from 'src/repositories/user-permission';

@Injectable()
export class UserPermissionDeleteByIdUseCase {
  @Inject(UserPermissionRepository)
  private readonly userPermissionRepository: UserPermissionRepository;

  public async execute({ id }: UserPermissionDeleteByIdDTO) {
    return this.userPermissionRepository.delete(id);
  }
}
