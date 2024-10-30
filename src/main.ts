import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  require('dotenv').config();
  const config = new DocumentBuilder()
    .setTitle('Register Address API')
    .setDescription('API for query address data using in registration')
    .setVersion('1.0')
    .build();

  app.setGlobalPrefix('register-address');
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('register-address/api', app, document);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  await app.listen(+process.env.PORT);
}
bootstrap();
