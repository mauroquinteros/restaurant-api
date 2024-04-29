import { Module } from '@nestjs/common';
import { ConfigModuleOptions } from './infrastructure/config/config.options';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [ConfigModuleOptions],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
