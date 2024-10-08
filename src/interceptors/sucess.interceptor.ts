import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import {Observable} from 'rxjs';
import {map, timeout} from 'rxjs/operators';
import moment from 'moment';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      timeout(5000),
      map((data: unknown) => ({
        success: true,
        data,
        timestamp: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
      }))
      // catchError(err => {
      //   if (err instanceof TimeoutError) {
      //     throw new RequestTimeoutException();
      //   }
      //   throw new HttpException(err, 400);
      // })
      // retryWhen(err => {
      //   return err.pipe(
      //     scan((acc, error) => {
      //       if (acc === 1) throw error;
      //       return acc + 1;
      //     }, 0),
      //     delay(2000)
      //   );
      // })
    );
  }
}
