import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Ingredients } from './recipe-detail.schema';

@Schema({ timestamps: true })
export class Recipe {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [Ingredients], default: [] })
  ingredients: Ingredients[];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
