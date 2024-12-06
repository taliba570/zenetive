import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false, nullable: true })
  photoURL: string;

  @Prop({ required: true })
  password: string;

  @Prop({ require: true })
  verificationToken: string;

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

  @Prop({ nullable: true })
  hashedRefreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
