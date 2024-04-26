import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Ingredient } from './ingredient.schema';

@Schema({ _id: false })
export class Ingredients {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Ingredient' })
  ingredient: Ingredient;

  @Prop({ required: true })
  quantity: number;
}
