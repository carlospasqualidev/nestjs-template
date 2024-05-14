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

import { AppModule } from './modules/app.module';
import { env } from './utilities/env';
import { ExceptionsFilter } from './utilities/exception-filter';
import { TrimPipe } from './utilities/pipes';

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
  app.useGlobalPipes(new TrimPipe());
  //#ENDREGION

  return app;
}

async function configureSwagger(app: NestFastifyApplication) {
  const config = new DocumentBuilder()
    .setTitle(env.get('PROJECT_NAME'))
    .setDescription(env.get('PROJECT_DESCRIPTION'))
    .setVersion(env.get('PROJECT_VERSION'))
    .addBearerAuth({
      type: 'apiKey',
      bearerFormat: 'JWT',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    })
    .build();

  await SwaggerModule.loadPluginMetadata(metadata);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}

async function configureSecurity(app: NestFastifyApplication) {
  await app.register(fastifyCsrf);
  await app.register(helmet);
  await app.register(cors, {
    origin: env.get('CORS_ORIGIN'),
  });
}

async function bootstrap() {
  const app = await configureApi();
  await configureSwagger(app);
  await configureSecurity(app);
  await app.listen(env.get('PORT'));
}

bootstrap();
