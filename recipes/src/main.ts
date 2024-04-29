import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RecipesModule } from './recipes.module';

async function bootstrap() {
  const app = await NestFactory.create(RecipesModule);

  const port = app.get(ConfigService).get<number>('server.port');

  await app.listen(port, '0.0.0.0');
}

bootstrap();
