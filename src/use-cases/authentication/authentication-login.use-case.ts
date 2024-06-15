import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationDTO } from 'src/dtos/authentication';
import { UserEntity } from 'src/entities/user';
import { UserRepository } from 'src/repositories/user';
import { cryptography } from 'src/utilities/cryptography';
import { jwt } from 'src/utilities/jwt/jwt';

@Injectable()
export class AuthenticationLoginUseCase {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;

  public async execute(dto: AuthenticationDTO) {
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

    return { accessToken };
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
