import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Timer extends Document {
  @Prop()
  userId: number;

  @Prop()
  taskId: number;

  @Prop({ type: Number, default: 0 })
  completedCycles: number;

  @Prop({ default: false })
  isRunning: boolean;

  @Prop({ default: Date.now })
  lastStart: Date;
}

export const TimerSchema = SchemaFactory.createForClass(Timer);
