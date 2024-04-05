import {HttpAdapterHost, NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ValidationPipe, Logger} from '@nestjs/common';
import AllExceptionsFilter from './common/error/all-exceptions-filter';
import AppLogger from './common/logger/Logger';
import {SuccessInterceptor} from './interceptors/sucess.interceptor';
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify';
import addLoggerHook from './hooks/logger.hooks';
import {config} from 'src/config/config';
// import multipart from '@fastify/multipart';
// import fastifyHelmet from '@fastify/helmet';

declare const module: any;
async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  console.debug(`config.MODE = ${config.MODE}`);
  console.debug(`config.MONGO_DB_URL = ${config.MONGO_DB_URL}`);

  const fastifyAdapter = new FastifyAdapter({
    bodyLimit: 2 * 1024 * 1024,
  });
  const app: NestFastifyApplication =
  await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
    {
      logger: new AppLogger(),
      rawBody: true,
    }
  );
  addLoggerHook(fastifyAdapter.getInstance());
  // app.register(multipart);
  
  const port = Number(config.SERVICE_PORT);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
  app.useGlobalInterceptors(new SuccessInterceptor());
  const swaggerConfig = new DocumentBuilder()
  .setTitle('API 문서')
  .setDescription(
    process.env.NODE_ENV === 'dev'
    ? '개발용 API 문서입니다'
    : '운영용 API 문서입니다'
  )
  .setVersion('1.0')
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'authorization',
    description: 'Enter JWT token',
    in: 'header',
  })
  .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  await app.listen(port, '0.0.0.0');
  
  logger.log(`School News Feed API Server is Running On: ${await app.getUrl()}`);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
