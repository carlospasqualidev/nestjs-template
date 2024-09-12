import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from 'src/presentation/modules/app.module';
import { ExceptionsFilter } from 'src/infrastructure/http/filters/exception';
import { TrimPipe } from 'src/infrastructure/http/pipes';

export async function configApi() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: ['error', 'warn'],
    },
  );

  //#REGION EXPETIONS FILTER
  app.useGlobalFilters(new ExceptionsFilter(app.get(HttpAdapterHost)));
  //#ENDREGION

  //#REGION VALIDATION PIPE FOR CLASS VALIDATOR
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalPipes(new TrimPipe());
  //#ENDREGION

  return app;
}
