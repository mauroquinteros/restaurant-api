import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredient, Recipe } from '../../infrastructure/persistence/schemas';
import { UpdateStockCommand } from './update-stock.command';

@CommandHandler(UpdateStockCommand)
export class UpdateStockHandler implements ICommandHandler<UpdateStockCommand> {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
    @InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>,
  ) {}

  async execute(command: UpdateStockCommand): Promise<void> {
    const recipes = await Promise.all(
      command.recipes.map(async (recipe) => {
        const data = await this.recipeModel.findById(recipe.id).exec();
        return { id: recipe.id, ingredients: data.ingredients };
      }),
    );

    recipes.forEach(async (recipe) => {
      recipe.ingredients.forEach(async ({ ingredient, quantity }) => {
        const data = await this.ingredientModel.findById(ingredient).exec();

        if (data.stock < quantity) {
          // TODO: Endpoint to get the required quantity from the market microservice
          throw new Error(`Not enough stock for ${data.name}`);
        }
        data.stock -= quantity;
        await data.save();
      });
    });
  }
}
