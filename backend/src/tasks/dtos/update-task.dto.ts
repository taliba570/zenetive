import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskPriority } from '../../commons/enums/task-priority';

export class UpdateTaskDto {
  @ApiProperty({ example: 'Write Code', description: 'Task title' })
  readonly name?: string;

  @ApiProperty({ example: 25, description: 'Pomodoro duration' })
  readonly duration?: number;

  @ApiProperty({ example: false, description: 'Is the task completed?' })
  readonly isCompleted?: boolean;

  @ApiPropertyOptional({ enum: TaskPriority, description: 'Task priority' })
  readonly priority?: TaskPriority | null;
}
