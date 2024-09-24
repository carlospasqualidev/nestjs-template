// IMPORTS
import { Inject, Injectable } from '@nestjs/common';

//#endregion

//#region REPOSITORIES
import { IUserRepository } from 'src/domain/user';
//#endregion

//#region DTOS
import { RegisterUserDTO } from 'src/application/dtos/register';
import { jwt } from 'src/infrastructure/security/jwt';
//#endregion

@Injectable()
export class RegisterUser {
  @Inject('IUserRepository')
  private readonly userRepository: IUserRepository;

  public async execute(dto: RegisterUserDTO) {
    const { token, ...data } = dto;
    const { email } = jwt.verify<{ email: string }>(token);

    const user = await this.userRepository.create({ ...data, email: email });

    return user;
  }
}
