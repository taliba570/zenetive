import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class PomodoroRecord extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Task', required: false })
  taskId?: Types.ObjectId;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop({ default: 25 })
  duration: number;

  @Prop({ default: false })
  wasCompleted: boolean;
}

export const PomodoroRecordSchema = SchemaFactory.createForClass(PomodoroRecord);
