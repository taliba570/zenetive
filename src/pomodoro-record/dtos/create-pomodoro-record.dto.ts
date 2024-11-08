import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreatePomodoroRecordDto {
  @ApiProperty({
    description: 'Duration of the pomodoro session in minutes',
    type: Number,
    example: 25,
  })
  readonly expectedDuration: number;

  @ApiProperty({
    description: 'The task ID associated with this pomodoro session',
    type: String,
    example: '614d9f2332f0a1b5c4c2a645',
  })
  readonly taskId: Types.ObjectId;

  @ApiProperty({
    description: 'The timestamp when the pomodoro session started',
    type: Number,
    example: '1729604939963',
  })
  readonly startTime: number;

  @ApiProperty({
    description: 'The timestamp when the pomodoro session ended',
    type: Number,
    example: '1729604939963',
  })
  readonly expectedEndTime?: number;
}

export class UpdatePomodoroRecordDto {
  @ApiProperty({
    description: 'Duration of the pomodoro session in minutes',
    type: Number,
    example: 25,
  })
  readonly spentDuration: number;

  @ApiProperty({
    description: 'The pomodoro record ID',
    type: String,
    example: '614d9f2332f0a1b5c4c2a645',
  })
  readonly id: Types.ObjectId;

  @ApiProperty({
    description: 'The timestamp when the pomodoro session ended',
    type: Number,
    example: '1729604939963',
  })
  readonly actualEndTime?: number;
}
