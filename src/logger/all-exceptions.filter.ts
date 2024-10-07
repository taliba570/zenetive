// src/logger/all-exceptions.filter.ts

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomLogger } from './custom-logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLogger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception;

    this.logger.error(
      `Exception thrown: ${JSON.stringify(message)}`,
      exception instanceof Error ? exception.stack : '',
      'ExceptionFilter'
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: (request as any).url,
      message,
    });
  }
}
