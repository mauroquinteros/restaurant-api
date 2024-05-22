import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BuyIngredientHandler } from './application/buy-ingredient';
import { ConfigModuleOptions } from './infrastructure/config/config.options';
import { MarketController } from './infrastructure/http';
import { ValidationModule } from './infrastructure/http/validation/validation.module';

@Module({
  imports: [ConfigModuleOptions, ValidationModule, CqrsModule],
  controllers: [MarketController],
  providers: [BuyIngredientHandler],
})
export class RecipesModule {}
