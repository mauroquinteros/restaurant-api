import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { BuyIngredientHandler } from './application/buy-ingredient';
import { ConfigModuleOptions } from './config/config.options';
import { MarketController } from './infrastructure/controllers/market.controller';
import { ValidationModule } from './infrastructure/validation/validation.module';
import { MongoModule } from './persistence/databases';
import { Market, MarketSchema } from './persistence/schemas';

@Module({
  imports: [
    ConfigModuleOptions,
    ValidationModule,
    CqrsModule,
    MongoModule,
    MongooseModule.forFeature([{ name: Market.name, schema: MarketSchema }]),
  ],
  controllers: [MarketController],
  providers: [BuyIngredientHandler],
})
export class RecipesModule {}
