import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import fastifyCsrf from '@fastify/csrf-protection';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { env } from '../env';

export async function configSecurity(app: NestFastifyApplication) {
  await app.register(fastifyCsrf);
  await app.register(helmet);
  await app.register(cors, {
    origin: env.get('CORS_ORIGIN'),
  });
}
