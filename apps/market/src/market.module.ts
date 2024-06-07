import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BuyIngredientHandler } from './application/buy-ingredient';
import { ConfigModuleOptions } from './config/config.options';
import { MarketController } from './infrastructure/controllers/market.controller';
import { ValidationModule } from './infrastructure/validation/validation.module';

@Module({
  imports: [ConfigModuleOptions, ValidationModule, CqrsModule],
  controllers: [MarketController],
  providers: [BuyIngredientHandler],
})
export class RecipesModule {}
