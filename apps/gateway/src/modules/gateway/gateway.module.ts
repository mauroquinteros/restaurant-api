import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { IngredientController } from './controllers/ingredient.controller';
import { MarketController } from './controllers/market.controller';
import { OrderController } from './controllers/order.controller';
import { RecipeController } from './controllers/recipe.controller';

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
      {
        name: 'RECIPES_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('recipes.host'),
            port: config.get<number>('recipes.port'),
          },
        }),
      },
      {
        name: 'MARKET_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('market.host'),
            port: config.get<number>('market.port'),
          },
        }),
      },
    ]),
  ],
  controllers: [
    OrderController,
    RecipeController,
    IngredientController,
    MarketController,
  ],
})
export class GatewayModule {}
