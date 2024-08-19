import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type orderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  product_id: Array<string>;

  @Prop()
  user_id: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);