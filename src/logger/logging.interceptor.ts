import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { CustomLogger } from './custom-logger.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: CustomLogger) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const { method, url } = req;
    const now = Date.now();

    this.logger.log(`Incoming Request: ${method} ${url}`, 'HTTP');

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `Outgoing Response: ${method} ${url} - ${Date.now() - now}ms`,
          'HTTP',
        );
      }),
    );
  }
}
