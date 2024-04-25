import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SaveIngredient } from './application/save-ingredient';
import { ConfigModuleOptions } from './infrastructure/config/config.options';
import { IngredientController } from './infrastructure/http';
import { MongoModule } from './infrastructure/persistence/databases';
import { Ingredient, IngredientSchema, Recipe, RecipeSchema } from './infrastructure/persistence/schemas';

@Module({
  imports: [
    ConfigModuleOptions,
    MongoModule,
    MongooseModule.forFeature([
      { name: Recipe.name, schema: RecipeSchema },
      { name: Ingredient.name, schema: IngredientSchema },
    ]),
  ],
  controllers: [IngredientController],
  providers: [SaveIngredient],
})
export class RecipesModule {}
