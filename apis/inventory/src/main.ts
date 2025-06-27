import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { getValidationPipe } from '@beemood/nest';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: process.env.NODE_ENV === 'production' ? ['error'] : ['log'],
    autoFlushLogs: true,
  });
  const cfg = app.get(ConfigService);

  const NAME = 'Inventory';
  const PREFIX = 'api';
  const PORT = cfg.getOrThrow('PORT');
  const MODE = cfg.getOrThrow('MODE');

  appConfig: {
    app.setGlobalPrefix(PREFIX);
    app.enableCors({ origins: '*' });
    app.use(helmet());
    app.useGlobalPipes(getValidationPipe());
  }

  swaggerConfig: {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(`${NAME} (${MODE})`)
      .addBearerAuth()
      .build();

    const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(PREFIX, app, swaggerDoc);
  }

  startApp: {
    await app.listen(PORT);

    Logger.log(
      `Server is up and running at http://${await app.getUrl()}:${PORT}/${PREFIX}`,
      `${NAME} (${MODE})`
    );
  }
}

bootstrap();
