import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ _id: false })
export class Recipes {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Recipe' })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  name: string;
}
