import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Ingredient } from './ingredient.schema';

@Schema()
export class RecipeDetail {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Ingredient' })
  ingredient: Ingredient;

  @Prop({ required: true })
  quantity: number;
}
