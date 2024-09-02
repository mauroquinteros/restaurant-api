import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const context = await NestFactory.createApplicationContext(AppModule);

  const configService = context.get(ConfigService);
  const serverPort = configService.get<number>('server.port');
  const gatewayPort = configService.get<number>('gateway.port');

  context.close();

  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: gatewayPort,
    },
  });

  await app.startAllMicroservices();
  await app.listen(serverPort);
}

bootstrap();
