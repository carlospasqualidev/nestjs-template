import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';
import { UnauthorizedException } from '@nestjs/common';
import { IToken } from './jwt.interface';
import { env } from 'src/infrastructure/config/env';

export class Jwt {
  private readonly jwtService: JwtService = new JwtService();

  public signAccessToken(payload: any) {
    return this.sign(payload, '15m');
  }

  public signRefreshToken(payload: any) {
    return this.sign(payload, '30d');
  }

  public verify(token: string): IToken {
    try {
      this.jwtService.verify(token, {
        secret: env.get('JWT_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException('Token inválido.');
    }

    return this.decode(token);
  }

  public decode(token: string): IToken {
    const payload = this.jwtService.decode(token) as IToken;

    if (!payload || !payload.user || !payload.user.id) {
      throw new UnauthorizedException('Token inválido.');
    }

    return payload;
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

  public sign(payload: any, expiresIn: string) {
    return this.jwtService.sign(payload, {
      expiresIn,
      secret: env.get('JWT_SECRET'),
    });
  }
}

export const jwt = new Jwt();
