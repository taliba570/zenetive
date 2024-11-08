import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Label extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({
    default: '#FFFFFF',
    match: /^#([0-9A-F]{3}){1,2}$/i,
  })
  color: string;
}

export const LabelSchema = SchemaFactory.createForClass(Label);
