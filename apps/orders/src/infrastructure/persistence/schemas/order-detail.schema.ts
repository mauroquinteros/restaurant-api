import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ _id: false })
export class OrderDetail {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Recipe' })
  recipe: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  quantity: number;
}
