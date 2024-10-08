import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Status } from '../../domain/enums';
import { Recipes } from './order-detail.schema';

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  quantity: number;

  @Prop({ enum: Status, required: true })
  state: Status;

  @Prop({ type: [Recipes], default: [] })
  recipes: Recipes[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
