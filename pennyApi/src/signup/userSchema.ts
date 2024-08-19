import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  user_id: string;

  @Prop()
  password: string;

  @Prop()
  phoneno: string;
}

export const UserSchema = SchemaFactory.createForClass(User);