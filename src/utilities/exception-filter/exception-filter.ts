import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { HttpAdapterHost } from '@nestjs/core';
import { IErrorMessage } from './expection-filter.interface';
import { dateTime } from '../date-time';
import { env } from '../env';
import { Prisma } from '@prisma/client';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const { getRequest, getResponse } = host.switchToHttp();

    let responseBody = this.responseBody(exception);

    const isHttpException = exception instanceof HttpException;

    if (isHttpException) {
      responseBody = exception.getResponse() as IErrorMessage;
    } else {
      this.showMessage(exception, getRequest());
    }

    httpAdapter.reply(getResponse(), responseBody, responseBody.statusCode);
  }

  private showMessage(exception: any, request: any) {
    const { url, method, headers, body, query, params } = request;

    //#region MOUNT MESSAGE
    const requestInfo = `
    📌 REQUEST INFO 📌

    URL: ${method} - ${url} 
    HEADERS: ${JSON.stringify(headers)}
    BODY: ${JSON.stringify(body)}
    QUERY: ${JSON.stringify(query)}
    PARAMS: ${JSON.stringify(params)}
`;

    const errorMessage = `
    ❌ ERROR ❌ - ${dateTime.format(new Date()).dateAndTime()}
        
    ${exception.stack}
    ${exception}`;

    const message = `
    ${errorMessage}
    ${requestInfo}`;
    //#endregion

    console.log(message);
    this.sendError(errorMessage, requestInfo);
  }

  private responseBody(exception: any) {
    let responseBody = {
      message: 'Oops! Encontramos um problema e nossa equipe foi notificada.',
      error: 'Internal Server Error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      responseBody = {
        message: this.handlePrismaException(exception),
        error: 'BAD REQUEST',
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
    return responseBody;
  }

  private handlePrismaException(exception: any) {
    const customErrors: { [key: string]: string } = {
      P2002: `A informação: ${exception.meta?.target} já existe na base de dados.`,
      P2003: 'Identificador único não encontrado na base de dados.',
      P2024: 'Erro de comunicação com a base de dados.',
      P2025: 'Registro não encontrado na base de dados.',
    };

    return (
      customErrors[exception.code] ||
      'Oops! Encontramos um problema e nossa equipe foi notificada.'
    );
  }

  private sendError(errorStack: string, extraInfo: any) {
    if (
      !['sandbox', 'production'].includes(env.get('ENVIRONMENT').toLowerCase())
    )
      return;

    fetch(env.get('LOG_SERVER_URL')!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectName: process.env.PROJECT_NAME,
        environment: process.env.ENVIRONMENT,
        side: 'Server',
        errorStack,
        extraInfo,
      }),
    });
  }
}
