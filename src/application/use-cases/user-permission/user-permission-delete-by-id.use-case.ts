import { Inject, Injectable } from '@nestjs/common';
import { UserPermissionDeleteByIdDTO } from 'src/application/dtos/user-permission';
import { IUserPermissionRepository } from 'src/domain/repositories';

@Injectable()
export class UserPermissionDeleteByIdUseCase {
  @Inject('IUserPermissionRepository')
  private readonly userPermissionRepository: IUserPermissionRepository;

  public async execute({ id }: UserPermissionDeleteByIdDTO) {
    return this.userPermissionRepository.delete(id);
  }
}
