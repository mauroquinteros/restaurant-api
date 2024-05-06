import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredient } from '../../infrastructure/persistence/schemas';
import { GetIngredientsQuery } from './get-ingredients.query';

@QueryHandler(GetIngredientsQuery)
export class GetIngredientsHandler implements IQueryHandler<GetIngredientsQuery> {
  constructor(@InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>) {}

  async execute(): Promise<Ingredient[]> {
    const response = await this.ingredientModel.find().exec();
    const ingredients = response.map((ingredient) => ({
      id: ingredient.id,
      name: ingredient.name,
      stock: ingredient.stock,
    }));
    return ingredients;
  }
}
