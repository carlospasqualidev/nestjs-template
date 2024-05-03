import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import fastifyCsrf from '@fastify/csrf-protection';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import metadata from './metadata';

import { AppModule } from './modules';
import { Env } from './utilities/env';
import { ExceptionsFilter } from './utilities/exceptions-filter';

async function configureApi() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  //#REGION EXPETIONS FILTER
  app.useGlobalFilters(new ExceptionsFilter(app.get(HttpAdapterHost)));
  //#ENDREGION

  //#REGION VALIDATION PIPE FOR CLASS VALIDATOR
  app.useGlobalPipes(new ValidationPipe());
  //#ENDREGION

  return app;
}

async function configureSwagger(app: NestFastifyApplication) {
  const config = new DocumentBuilder()
    .setTitle(Env.get('PROJECT_NAME'))
    .setDescription(Env.get('PROJECT_DESCRIPTION'))
    .setVersion(Env.get('PROJECT_VERSION'))
    .build();

  await SwaggerModule.loadPluginMetadata(metadata);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}

async function configureSecurity(app: NestFastifyApplication) {
  await app.register(fastifyCsrf);
  await app.register(helmet);
  await app.register(cors, {
    origin: Env.get('CORS_ORIGIN'),
  });
}

async function bootstrap() {
  const app = await configureApi();
  await configureSwagger(app);
  await configureSecurity(app);
  await app.listen(Env.get('PORT'));
}

bootstrap();
