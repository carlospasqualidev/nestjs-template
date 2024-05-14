import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user';
import { jwt } from 'src/utilities/jwt';
import { FastifyRequest } from 'fastify';

@Injectable()
export class AuthenticationLogoutUseCase {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;

  public async execute(req: FastifyRequest) {
    const payload = jwt.decode(jwt.extractTokenFromHeader(req));

    const user = await this.userRepository.findById(payload.user.id);

    jwt.verify(user.refreshToken);

    await this.userRepository.updateRefreshToken({
      userId: user.id,
      refreshToken: null,
    });
  }
}
