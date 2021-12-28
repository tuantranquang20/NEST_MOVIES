import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from './modules/common/services/config.service';
import { DatabaseModule } from './db/database.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import '~plugins/moment';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  const databaseModule: DatabaseModule = app.get('DatabaseModule');
  databaseModule.runMigrations();

  const whitelist = configService.cors;
  const corsOptions: CorsOptions = {
    origin: whitelist,
    allowedHeaders: ['Content-Type', 'Authorization', 'Language'],
    optionsSuccessStatus: 200,
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  };

  app.enableCors(corsOptions);
  app.setGlobalPrefix(configService.basePath);

  await app.listen(configService.port);
}
bootstrap();
