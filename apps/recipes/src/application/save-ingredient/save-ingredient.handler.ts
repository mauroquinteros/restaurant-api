import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredient } from '../../infrastructure/persistence/schemas';
import { SaveIngredientCommand } from './save-ingredient.command';

@CommandHandler(SaveIngredientCommand)
export class SaveIngredientHandler implements ICommandHandler<SaveIngredientCommand> {
  constructor(@InjectModel(Ingredient.name) private model: Model<Ingredient>) {}

  async execute(command: SaveIngredientCommand): Promise<Ingredient> {
    const ingredientModel = new this.model({
      name: command.name,
      stock: command.stock,
    });
    const response = await ingredientModel.save();
    return response;
  }
}
