import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Status } from '../../../domain/enums/';
import { OrderDetail } from './order-detail.schema';

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  quantity: string;

  @Prop({ enum: Status, required: true })
  state: Status;

  @Prop({ type: [OrderDetail], default: [] })
  details: OrderDetail[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
