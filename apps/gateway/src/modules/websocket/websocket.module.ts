import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppWebSocketGateway } from './websocket.gateway';
import { WebSocketService } from './websocket.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'ORDERS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            port: config.get<number>('orders.port'),
          },
        }),
      },
    ]),
  ],
  providers: [AppWebSocketGateway, WebSocketService],
  exports: [AppWebSocketGateway],
})
export class WebSocketModule {}
