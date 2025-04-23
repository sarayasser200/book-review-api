import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GqlAuthGuard } from './auth/gql-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalGuards(new GqlAuthGuard());



  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
