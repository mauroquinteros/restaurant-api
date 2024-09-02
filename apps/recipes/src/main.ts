import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RecipesModule } from './recipes.module';

async function bootstrap() {
  const context = await NestFactory.createApplicationContext(RecipesModule);
  const configService = context.get(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(RecipesModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get<number>('server.port'),
    },
  });

  context.close();

  await app.listen();
}

bootstrap();
