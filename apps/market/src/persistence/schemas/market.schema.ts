import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Market {
  @Prop({ required: true })
  ingredient: string;

  @Prop({ required: true })
  quantity: number;
}

export const MarketSchema = SchemaFactory.createForClass(Market);
