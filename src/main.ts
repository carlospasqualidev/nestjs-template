import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import fastifyCsrf from '@fastify/csrf-protection';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  //#region DOCUMENTATION
  const config = new DocumentBuilder()
    .setTitle('nestJS Template')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  //#endregion

  //#region SECURITY
  await app.register(fastifyCsrf);
  await app.register(helmet);
  await app.register(cors, {
    origin: '*',
  });
  //#endregion

  await app.listen(8080);
}
bootstrap();
