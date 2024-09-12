import { Inject, Injectable } from '@nestjs/common';
import { jwt } from 'src/infrastructure/security/jwt';
import { FastifyRequest } from 'fastify';
import { IUserRepository } from 'src/domain/repositories';

@Injectable()
export class AccessLogoutUseCase {
  @Inject('IUserRepository')
  private readonly userRepository: IUserRepository;

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
