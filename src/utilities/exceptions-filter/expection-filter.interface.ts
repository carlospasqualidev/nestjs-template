import { HttpStatus } from '@nestjs/common';

export interface IErrorMessage {
  statusCode: HttpStatus;
  message: string;
  error: string;
}
