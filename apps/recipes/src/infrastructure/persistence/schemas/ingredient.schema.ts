import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Ingredient {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  stock: number;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
