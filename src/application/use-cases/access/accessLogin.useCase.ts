import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AccessDTO } from 'src/application/dtos/access/access.dto';
import { UserEntity } from 'src/domain/entities';
import { IUserRepository } from 'src/domain/repositories';
import { cryptography } from 'src/infrastructure/security/cryptography';
import { jwt } from 'src/infrastructure/security/jwt/jwt';

@Injectable()
export class AccessLoginUseCase {
  @Inject('IUserRepository')
  private readonly userRepository: IUserRepository;

  public async execute(dto: AccessDTO) {
    const user = await this.userRepository.findByEmail(dto.email, {
      validate: false,
    });

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

  private async checkPasswordMatch(password: string, user: UserEntity) {
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

  private async handleRefreshToken(user: UserEntity, payload: any) {
    const refreshToken = jwt.signRefreshToken(payload);

    await this.userRepository.updateRefreshToken({
      userId: user.id,
      refreshToken,
    });
  }
}
