import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredient, Recipe } from '../../infrastructure/persistence/schemas';
import { GetRecipesQuery } from './get-recipes.query';
import { GetRecipesResponse } from './get-recipes.response.query';

@QueryHandler(GetRecipesQuery)
export class GetRecipesHandler implements IQueryHandler<GetRecipesQuery> {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
    @InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>,
  ) {}

  async execute(): Promise<GetRecipesResponse[]> {
    const recipes = await this.recipeModel.find().exec();

    const response: GetRecipesResponse[] = [];

    for (const recipe of recipes) {
      const ingredients = await Promise.all(
        recipe.ingredients.map(async ({ ingredient, quantity }) => {
          const data = await this.ingredientModel.findById(ingredient).exec();
          return { name: data.name, quantity };
        }),
      );
      response.push(new GetRecipesResponse(recipe.name, ingredients));
    }

    return response;
  }
}
