import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  const port = app.get(ConfigService).get<number>('server.port');

  await app.listen(port, '0.0.0.0');
}

bootstrap();
