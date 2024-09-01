import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WebSocketController } from './controllers/websocket.controller';
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
            host: config.get<string>('orders.host'),
            port: config.get<number>('orders.port'),
          },
        }),
      },
    ]),
  ],
  controllers: [WebSocketController],
  providers: [AppWebSocketGateway, WebSocketService],
  exports: [AppWebSocketGateway],
})
export class WebSocketModule {}
