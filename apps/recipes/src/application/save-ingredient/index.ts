import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredient } from '../../infrastructure/persistence/schemas';

@Injectable()
export class SaveIngredient {
  constructor(@InjectModel(Ingredient.name) private model: Model<Ingredient>) {}

  execute() {
    const ingredientModel = new this.model({
      name: 'tomato',
      stock: 10,
    });
    return ingredientModel.save();
  }
}
