import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class PomodoroSettings extends Document {
  @Prop({ required: true })
  userId: Types.ObjectId;

  @Prop({ default: 25 })
  workDuration: number;

  @Prop({ default: 5 })
  shortBreakDuration: number;

  @Prop({ default: 15 })
  longBreakDuration: number;

  @Prop({ default: 4 })
  cyclesBeforeLongBreak: number;

  @Prop({ default: 8 })
  dailyPomodoroTarget: number;

  @Prop({ default: 0 })
  totalFocusedHours: number;
}

export const PomodoroSettingsSchema = SchemaFactory.createForClass(PomodoroSettings);