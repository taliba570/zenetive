import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreatePomodoroRecordDto {
  @ApiProperty({
    description: 'Duration of the pomodoro session in minutes',
    type: Number,
    example: 25,
  })
  readonly duration: number;

  @ApiProperty({
    description: 'The task ID associated with this pomodoro session',
    type: String,
    example: '614d9f2332f0a1b5c4c2a645'
  })
  readonly taskId: Types.ObjectId;

  @ApiProperty({
    description: 'The timestamp when the pomodoro session started',
    type: Date,
    example: '2024-09-12T10:30:00Z',
  })
  readonly startTime: Date;

  @ApiProperty({
    description: 'The timestamp when the pomodoro session ended',
    type: Date,
    example: '2024-09-12T10:55:00Z',
  })
  readonly endTime: Date;

  @ApiProperty({
    description: 'If the session was completed?',
    type: Boolean,
    example: true,
  })
  readonly wasCompleted: number;
}