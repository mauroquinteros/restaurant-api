import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { GetIngredientsHandler } from './application/get-ingredients';
import { GetRecipesHandler } from './application/get-recipes';
import { SaveIngredientHandler } from './application/save-ingredient';
import { SaveRecipeHandler } from './application/save-recipe';
import { UpdateStockHandler } from './application/update-stock';
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
    ClientsModule.registerAsync([
      {
        name: 'MARKET_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            port: config.get<number>('market.port'),
          },
        }),
      },
    ]),
  ],
  controllers: [IngredientController, RecipeController],
  providers: [SaveIngredientHandler, SaveRecipeHandler, GetIngredientsHandler, GetRecipesHandler, UpdateStockHandler],
})
export class RecipesModule {}
