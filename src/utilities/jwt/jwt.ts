import { JwtService } from '@nestjs/jwt';
import { env } from '../env';
import { FastifyRequest } from 'fastify';
import { UnauthorizedException } from '@nestjs/common';

export class Jwt {
  private readonly jwtService: JwtService = new JwtService();

  public signAccessToken(payload: any) {
    return this.sign(payload, '15m');
  }

  public signRefreshToken(payload: any) {
    return this.sign(payload, '30d');
  }

  public verify(token: string): string {
    try {
      this.jwtService.verify(token, {
        secret: env.get('JWT_SECRET'),
      });
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Token inválido');
    }

    return this.decode(token);
  }

  public decode(token: string): any {
    const payload = this.jwtService.decode(token);

    if (!payload) {
      throw new UnauthorizedException('Token inválido');
    }

    return this.jwtService.decode(token);
  }

  public extractTokenFromHeader(request: FastifyRequest): string | undefined {
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Header de autorização não encontrado');
    }

    const [type, token] = authorization?.split(' ') ?? [];

    if (!type || !token || type !== 'Bearer')
      throw new UnauthorizedException(
        'O token deve possuir o formato: Bearer ###',
      );

    return token;
  }

  private sign(payload: any, expiresIn: string) {
    return this.jwtService.sign(payload, {
      expiresIn,
      secret: env.get('JWT_SECRET'),
    });
  }
}

export const jwt = new Jwt();
