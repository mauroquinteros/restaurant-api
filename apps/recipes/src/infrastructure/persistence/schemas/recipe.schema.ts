import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RecipeDetail } from './recipe-detail.schema';

@Schema({ timestamps: true })
export class Recipe {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [RecipeDetail], default: [] })
  ingredients: RecipeDetail[];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
