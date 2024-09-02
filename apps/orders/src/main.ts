import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { OrdersModule } from './orders.module';

async function bootstrap() {
  const context = await NestFactory.createApplicationContext(OrdersModule);
  const configService = context.get(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(OrdersModule, {
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
