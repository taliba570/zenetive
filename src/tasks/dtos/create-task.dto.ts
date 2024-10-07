import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsOptional } from "class-validator";
import { Types } from "mongoose";
import { TaskPriority } from "src/commons/enums/task-priority";

export class CreateTaskDto {
  @ApiProperty({ example: 'Write code', description: 'Name of the task' })
  name: string;

  @ApiProperty({ example: 25, description: 'Duration of the task in minutes' })
  duration: number;

  @ApiProperty({ example: false, description: 'Whether the task is completed' })
  isCompleted: boolean;

  @ApiPropertyOptional({ enum: TaskPriority, description: 'Task priority' })
  priority?: TaskPriority | null;

  @ApiPropertyOptional({ 
    example: ['64c9d8a7b0f7a3dceda1a7f0'], 
    description: 'Array of label IDs', 
    type: [String]
  })
  labels?: Types.ObjectId[];

  @IsDateString()
  @IsOptional()
  dueDate?: string;
}