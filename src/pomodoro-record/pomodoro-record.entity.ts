import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class PomodoroRecord extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Task', required: false })
  taskId?: Types.ObjectId;

  @Prop({ required: true })
  startTime: Number;

  @Prop({ required: false, default: null })
  endTime: Number;

  @Prop({ default: false })
  isRunning: boolean;

  @Prop({ default: false })
  wasCompleted: boolean;

  @Prop({ required: true })
  duration: number;
}

export const PomodoroRecordSchema = SchemaFactory.createForClass(PomodoroRecord);
