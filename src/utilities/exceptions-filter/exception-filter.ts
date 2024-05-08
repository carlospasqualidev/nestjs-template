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

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const { getRequest, getResponse } = host.switchToHttp();

    const isHttpException = exception instanceof HttpException;

    let responseBody = {
      message: 'Oops! Encontramos um problema e nossa equipe foi notificada.',
      error: 'Internal Server Error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };

    if (isHttpException) {
      responseBody = exception.getResponse() as IErrorMessage;
    } else {
      this.showMessage(exception, getRequest());
    }

    httpAdapter.reply(getResponse(), responseBody, responseBody.statusCode);
  }

  showMessage(exception: unknown, request: any) {
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
        
${exception}`;

    const message = `
    ${errorMessage}
    ${requestInfo}`;
    //#endregion

    console.log(message);
    this.sendError(errorMessage, requestInfo);
  }

  sendError(errorStack: string, extraInfo: any) {
    if (!['Sandbox', 'Production'].includes(env.get('ENVIRONMENT'))) return;

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
