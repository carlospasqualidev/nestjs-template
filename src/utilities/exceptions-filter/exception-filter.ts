import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { HttpAdapterHost } from '@nestjs/core';
import { IErrorMessage } from './expection-filter.interface';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const isHttpException = exception instanceof HttpException;

    let responseBody = {
      message: 'Oops! Encontramos um problema e nossa equipe foi notificada.',
      error: 'Internal Server Error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };

    if (isHttpException) {
      responseBody = exception.getResponse() as IErrorMessage;
    } else {
      this.showMessage(exception);
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.statusCode);
  }

  showMessage(exception: unknown) {
    const errorMessage = `
  ❌ Error ❌ - ${new Date()}
      
      
  ${exception}
  `;

    console.log(errorMessage);
  }
}
