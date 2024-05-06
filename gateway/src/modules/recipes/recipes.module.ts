import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { IngredientController } from './infrastructure/controllers/ingredient.controller';
import { RecipeController } from './infrastructure/controllers/recipe.controller';

@Module({
  imports: [
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
    ]),
  ],
  controllers: [IngredientController, RecipeController],
})
export class RecipesModule {}
