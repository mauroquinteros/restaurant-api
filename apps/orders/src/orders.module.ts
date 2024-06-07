import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { GetOrdersHandler } from './application/get-orders';
import { SaveOrderHandler } from './application/save-order';
import { UpdateOrderStatusHandler } from './application/update-order-status';
import { ConfigModuleOptions } from './infrastructure/config/config.options';
import { OrderController } from './infrastructure/http';
import { ValidationModule } from './infrastructure/http/validation/validation.module';
import { MongoModule } from './infrastructure/persistence/databases';
import { Order, OrderSchema } from './infrastructure/persistence/schemas';

@Module({
  imports: [
    ConfigModuleOptions,
    ValidationModule,
    CqrsModule,
    MongoModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ClientsModule.registerAsync([
      {
        name: 'RECIPES_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            port: config.get<number>('recipes.port'),
          },
        }),
      },
      {
        name: 'GATEWAY_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            port: config.get<number>('gateway.port'),
          },
        }),
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [SaveOrderHandler, UpdateOrderStatusHandler, GetOrdersHandler],
})
export class OrdersModule {}
