// IMPORTS
import { Inject, Injectable } from '@nestjs/common';
import { jwt, IAuthorizationToken } from 'src/infrastructure/security/jwt';
import { FastifyRequest } from 'fastify';
//#endregion

//#REGION REPOSITORIES
import { IUserRepository } from 'src/domain/user';
//#endregion

@Injectable()
export class AccessRefreshAccessTokenUseCase {
  @Inject('IUserRepository')
  private readonly userRepository: IUserRepository;

  public async execute(req: FastifyRequest) {
    const payload = jwt.verify<IAuthorizationToken>(
      jwt.extractTokenFromHeader(req),
    );

    const user = await this.userRepository.findRefreshTokenById({
      id: payload.user.id,
    });

    jwt.verify(user.refreshToken);

    const newPayload = {
      user: {
        id: user.id,
      },
    };

    const accessToken = jwt.signAccessToken(newPayload);

    return { accessToken: `Bearer ${accessToken}` };
  }
}
