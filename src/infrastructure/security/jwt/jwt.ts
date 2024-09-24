import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';
import { UnauthorizedException } from '@nestjs/common';

import { env } from 'src/infrastructure/config/env';

export class Jwt {
  private readonly jwtService: JwtService = new JwtService();

  public signAccessToken(payload: any) {
    return this.sign(payload, '15m');
  }

  public signRefreshToken(payload: any) {
    return this.sign(payload, '30d');
  }

  public verify<T>(token: string): T {
    try {
      const payload = this.jwtService.verify(token, {
        secret: env.get('JWT_SECRET'),
      });
      return payload as T;
    } catch (error) {
      throw new UnauthorizedException('Token inválido.');
    }
  }

  public sign(payload: any, expiresIn: string) {
    return this.jwtService.sign(payload, {
      expiresIn,
      secret: env.get('JWT_SECRET'),
    });
  }

  public extractTokenFromHeader(request: FastifyRequest): string | undefined {
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Header de autorização não encontrado.');
    }

    const [type, token] = authorization?.split(' ') ?? [];

    if (!type || !token || type !== 'Bearer')
      throw new UnauthorizedException(
        'O token deve possuir o formato: Bearer ###',
      );

    return token;
  }
}

export const jwt = new Jwt();
