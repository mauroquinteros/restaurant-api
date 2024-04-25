import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredient } from '../../infrastructure/persistence/schemas';
import { Command } from './save-ingredient.command';

export { Command as SaveIngredientCommand } from './save-ingredient.command';

@Injectable()
export class SaveIngredient {
  constructor(@InjectModel(Ingredient.name) private model: Model<Ingredient>) {}

  async execute(command: Command) {
    const ingredientModel = new this.model({
      name: command.name,
      stock: command.stock,
    });
    const response = await ingredientModel.save();
    return response;
  }
}
