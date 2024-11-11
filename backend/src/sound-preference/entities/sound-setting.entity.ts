import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Sound extends Document {
  @Prop({ required: true })
  volume: number;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  icon: string;
}

export const SoundSchema = SchemaFactory.createForClass(Sound);

@Schema()
export class SoundPreference extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({
    type: [SoundSchema],
    default: [],
  })
  sounds: Sound[];
}

export const SoundPreferenceSchema =
  SchemaFactory.createForClass(SoundPreference);
