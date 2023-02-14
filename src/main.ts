import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  await app.listen(3000, process.env.HOST ?? "localhost");
}
bootstrap();

export const viteNodeApp = NestFactory.create(AppModule);
