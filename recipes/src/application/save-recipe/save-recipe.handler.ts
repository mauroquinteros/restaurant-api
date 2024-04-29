import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredient, Recipe } from '../../infrastructure/persistence/schemas';
import { SaveRecipeCommand } from './save-recipe.command';

@CommandHandler(SaveRecipeCommand)
export class SaveRecipeHandler implements ICommandHandler<SaveRecipeCommand> {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
    @InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>,
  ) {}

  async execute(command: SaveRecipeCommand): Promise<Recipe> {
    const ingredients = await Promise.all(
      command.ingredients.map(async (ingredient) => {
        const data = await this.ingredientModel.findOne({ name: ingredient.name }).exec();
        return { ingredient: data.id, quantity: ingredient.quantity };
      }),
    );

    const recipeModel = new this.recipeModel({
      name: command.name,
      ingredients,
    });

    const response = await recipeModel.save();
    return response;
  }
}
