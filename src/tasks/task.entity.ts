import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { TaskPriority } from "src/commons/enums/task-priority";

@Schema()
export class Task extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  duration: number;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ enum: TaskPriority, default: null })
  priority: TaskPriority | null;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Label' }], default: []})
  labels: Types.ObjectId[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);