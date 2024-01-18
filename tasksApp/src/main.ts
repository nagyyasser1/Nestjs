import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  app.enableCors();
  app.use(cookieParser(process.env.COOKIE_SEC));

  await app.listen(process.env.PORT);
}
bootstrap();
