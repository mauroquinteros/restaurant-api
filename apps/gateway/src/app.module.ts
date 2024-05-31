import { Module } from '@nestjs/common';
import { ConfigModuleOptions } from './config/config.options';
import { GatewayModule } from './modules/gateway/gateway.module';
import { WebSocketModule } from './modules/websocket/websocket.module';
import { ValidationModule } from './validation/validation.module';

@Module({
  imports: [
    ConfigModuleOptions,
    ValidationModule,
    GatewayModule,
    WebSocketModule,
  ],
})
export class AppModule {}
