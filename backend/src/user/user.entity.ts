import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  photo: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: false })
  googleLinked: boolean;

  @Prop({ default: false })
  githubLinked: boolean;

  @Prop({ nullable: true })
  resetPasswordToken?: string;

  @Prop({ nullable: true })
  resetPasswordExpires?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
