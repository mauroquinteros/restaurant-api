import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { BuyIngredientHandler } from './application/buy-ingredient';
import { ConfigModuleOptions } from './infrastructure/config/config.options';
import { MarketController } from './infrastructure/http';
import { ValidationModule } from './infrastructure/http/validation/validation.module';
import { MongoModule } from './infrastructure/persistence/databases';
import { Ingredient, IngredientSchema } from './infrastructure/persistence/schemas';

@Module({
  imports: [
    ConfigModuleOptions,
    ValidationModule,
    CqrsModule,
    MongoModule,
    MongooseModule.forFeature([{ name: Ingredient.name, schema: IngredientSchema }]),
  ],
  controllers: [MarketController],
  providers: [BuyIngredientHandler],
})
export class RecipesModule {}
