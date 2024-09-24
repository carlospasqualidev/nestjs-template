// IMPORTS
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { jwt } from 'src/infrastructure/security/jwt';
import { cryptography } from 'src/infrastructure/security/cryptography';
//#endregion

//#region DTOS
import { AccessDTO } from 'src/application/dtos/access/access.dto';
import { UserFindPasswordByIdOrEmailReturnDTO } from 'src/application/dtos/user';
//#endregion

//#REGION REPOSITORIES
import { IUserRepository } from 'src/domain/user';
//#endregions

@Injectable()
export class AccessLoginUseCase {
  @Inject('IUserRepository')
  private readonly userRepository: IUserRepository;

  public async execute(dto: AccessDTO) {
    const user = await this.userRepository.findPasswordByIdOrEmail(
      { email: dto.email },
      {
        validate: false,
      },
    );

    await this.checkPasswordMatch(dto.password, user);

    const payload = {
      user: {
        id: user.id,
      },
    };

    const accessToken = jwt.signAccessToken(payload);
    await this.handleRefreshToken(user, payload);

    return { accessToken: `Bearer ${accessToken}` };
  }

  private async checkPasswordMatch(
    password: string,
    user: UserFindPasswordByIdOrEmailReturnDTO,
  ) {
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const passwordMatch = await cryptography.comparePassword(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }
  }

  private async handleRefreshToken(
    user: UserFindPasswordByIdOrEmailReturnDTO,
    payload: any,
  ) {
    const refreshToken = jwt.signRefreshToken(payload);

    await this.userRepository.updateRefreshToken({
      userId: user.id,
      refreshToken,
    });
  }
}
