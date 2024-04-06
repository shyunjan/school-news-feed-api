import {
  ArgumentsHost,
  BadRequestException,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import {HttpAdapterHost} from '@nestjs/core';
import moment from 'moment';
import {ResponseBodyType} from 'src/types';
import {RESULT_CODE} from '../../constant';
import CustomError from './custom-error';
import { ValidationError } from 'class-validator';

export default class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  private readonly logger = new Logger(this.constructor.name);

  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof CustomError) {
      this.logger.error(
        `${exception.message}${
          exception.data ? `\n\r${JSON.stringify(exception.data)}` : ''
        }`,
        exception.stack,
        exception.context || this.constructor.name
      );
    } else if (
      exception instanceof HttpException ||
      exception instanceof Error
    ) {
      // if (exception instanceof HttpException) this.logger.debug(exception?.constraints[Object.keys(exception.constraints)[0]]);
      this.logger.error(exception.message, exception.stack);
    }

    const {httpAdapter} = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let code: number // 서비스 정의 코드
    , statusCode: number // HTTP 상태 코드
    , message: string = '' // 상세 에러 메시지
    , error: string; // Error 클래스 메시지
    if (exception instanceof CustomError) {
      code = exception.code;
      statusCode = exception.status;
      error = exception.message;
    } else if (exception instanceof BadRequestException) {
      code = RESULT_CODE.VALIDATION_ERROR;
      statusCode = exception.getStatus();
      const response = exception.getResponse() as { message: {[type: string]: string}[] };
      message = JSON.stringify(response.message);
      error = exception.message;
    } else if (exception instanceof HttpException) {
      code = RESULT_CODE.UNKNOWN_ERROR;
      statusCode = exception.getStatus();
      error = exception.message;
    } else {
      code = RESULT_CODE.UNKNOWN_ERROR;
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      error = exception instanceof Error ? exception.message : '';
    }

    const responseBody: ResponseBodyType = {
      code,
      statusCode,
      timestamp: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
      message,
      error
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
