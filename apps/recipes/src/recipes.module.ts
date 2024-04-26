import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { SaveIngredientHandler } from './application/save-ingredient';
import { SaveRecipeHandler } from './application/save-recipe';
import { ConfigModuleOptions } from './infrastructure/config/config.options';
import { IngredientController, RecipeController } from './infrastructure/http';
import { ValidationModule } from './infrastructure/http/validation/validation.module';
import { MongoModule } from './infrastructure/persistence/databases';
import { Ingredient, IngredientSchema, Recipe, RecipeSchema } from './infrastructure/persistence/schemas';

@Module({
  imports: [
    ConfigModuleOptions,
    ValidationModule,
    CqrsModule,
    MongoModule,
    MongooseModule.forFeature([
      { name: Recipe.name, schema: RecipeSchema },
      { name: Ingredient.name, schema: IngredientSchema },
    ]),
  ],
  controllers: [IngredientController, RecipeController],
  providers: [SaveIngredientHandler, SaveRecipeHandler],
})
export class RecipesModule {}
