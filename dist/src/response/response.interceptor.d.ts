import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Response } from './interface';
import { Observable } from 'rxjs';
export declare class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>>;
    responseHandler(res: T, context: ExecutionContext): Response<T>;
}
