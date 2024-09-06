import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { ResponseInterceptor } from './response/response.interceptor';
import { HttpExceptionFilter } from './http-filter/http-filter.filter';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  // 全局路由前缀
  app.setGlobalPrefix('api/v1');
  // 允许跨域
  app.enableCors();
  // 配置全局uniform response format
  app.useGlobalInterceptors(new ResponseInterceptor());
  // 配置全局Exception Filter
  app.useGlobalFilters(new HttpExceptionFilter(new Logger()));
  app.useGlobalPipes(
    new ValidationPipe({
      /**
       * If set to true
       * validator will strip validated (returned) object
       * of any properties that do not use any validation decorators.
       */
      whitelist: true,
      /**
       * When set to true
       * validation of the given property will stop after encountering the first error
       * Defaults to false
       */
      stopAtFirstError: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
