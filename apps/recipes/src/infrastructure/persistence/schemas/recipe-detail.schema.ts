import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ _id: false })
export class Ingredients {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Ingredient' })
  ingredient: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  quantity: number;
}
