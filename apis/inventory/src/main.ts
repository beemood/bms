/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const GLOBAL_REFIX = 'api';

  app.setGlobalPrefix(GLOBAL_REFIX);

  const config = app.get(ConfigService);

  const PORT = config.getOrThrow('PORT');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Inventory')
    .addBearerAuth()
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDoc);

  await app.listen(PORT);

  Logger.log(
    `🚀 Application is running on: http://localhost:${PORT}/${GLOBAL_REFIX}`
  );
}

bootstrap();
