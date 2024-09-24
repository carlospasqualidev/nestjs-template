import { HttpStatus } from '@nestjs/common';

export interface IErrorMessage {
  statusCode: HttpStatus;
  message: string[] | string;
  error: string;
}
