import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PomodoroState } from '../commons/enums/pomodoro-state';
import { SessionLengthVariability } from '../commons/enums/session-length-variability';
import { SessionType } from '../commons/enums/session-type';

@Schema()
export class PomodoroRecord extends Document {
  @Prop({ 
    type: String, 
    enum: SessionType, 
    required: true, 
    default: SessionType.WORK 
  })
  sessionType: SessionType;
  
  @Prop({ 
    type: String, 
    enum: PomodoroState, 
    required: true, 
    default: PomodoroState.IN_PROGRESS 
  })
  state: PomodoroState;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
  
  @Prop({ type: Types.ObjectId, ref: 'Task', required: false })
  taskId?: Types.ObjectId;

  @Prop({ required: true })
  expectedDuration: number;

  @Prop({ required: false })
  spentDuration?: number;

  @Prop({ required: true })
  startTime: number;

  @Prop({ required: false, default: null })
  expectedEndTime: number;

  @Prop({ required: false, default: null })
  actualEndTime: number;

  @Prop({ required: false, default: null })
  environment?: string; // user-reported working environment (e.g., home, office)

  @Prop({ required: false, default: 0 })
  sessionPauses?: number; // Number of times the session was paused

  @Prop({ required: false, default: null })
  interruptionsSource?: string; // "internal" or "external"

  // Array of objects tracking pause and resume timestamps
  @Prop({
    type: [
      {
        pauseTime: { type: Number, required: true },
        resumeTime: { type: Number, default: null }
      }
    ],
    default: []
  })
  pauseResumeTimestamps: { pauseTime: number; resumeTime?: number }[];

  @Prop({ required: false, default: null })
  reasonForSkipping?: string; // reason for skipping or interrupting

  // Advanced Metrics for Reporting
  @Prop({ required: false, default: null })
  focusLevel?: number; // scale from 1-5 for user-reported focus

  @Prop({ required: false, default: null })
  energyLevel?: number; // scale from 1-5 for user-reported energy

  @Prop({ required: false, default: null })
  note?: string; // anything user want to add to the pomodoro record
  
  @Prop({ 
    type: String, 
    enum: SessionLengthVariability, 
    required: true, 
    default: SessionLengthVariability.CONSTANT
  })
  sessionLengthVariability: SessionLengthVariability;
}

export const PomodoroRecordSchema = SchemaFactory.createForClass(PomodoroRecord);
