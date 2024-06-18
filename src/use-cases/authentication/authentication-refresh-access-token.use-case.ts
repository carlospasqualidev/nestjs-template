import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user';
import { jwt } from 'src/utilities/jwt';
import { FastifyRequest } from 'fastify';

@Injectable()
export class AuthenticationRefreshAccessTokenUseCase {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;

  public async execute(req: FastifyRequest) {
    const payload = jwt.decode(jwt.extractTokenFromHeader(req));

    const user = await this.userRepository.findById(payload.user.id);

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
