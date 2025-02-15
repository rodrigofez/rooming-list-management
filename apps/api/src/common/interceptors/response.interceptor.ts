import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Response as HttpResponse } from 'express';
import { ZodSerializationException } from 'nestjs-zod';
import { Response } from '@repo/schemas';

enum STATUS {
  SUCCESS = 'success',
  FAILED = 'failed',
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, Response<unknown>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<unknown>> {
    return next.handle().pipe(
      map((res: unknown) => this.responseHandler(res)),
      catchError((err: HttpException) =>
        throwError(() => this.errorHandler(err, context)),
      ),
    );
  }

  errorHandler(exception: HttpException, context: ExecutionContext) {
    const logger = new Logger(ResponseInterceptor.name);

    if (exception instanceof ZodSerializationException) {
      const zodError = exception.getZodError();
      logger.error(`ZodSerializationException: ${zodError.message}`);
    }
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<HttpResponse>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      status: STATUS.FAILED,
      message: exception.message,
    });
  }

  responseHandler(res: any) {
    return {
      status: STATUS.SUCCESS,
      data: res as string,
    };
  }
}
