import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type productDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  product_id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;
  @Prop()
  category: string;

  @Prop()
  stock: number;

  @Prop()
  rating: number;

  @Prop()
  reviews: Array<Review>;
}

export class Review {
  @Prop()
  user: string;

  @Prop()
  comment: string;

  @Prop()
  rating: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
