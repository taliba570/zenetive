import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
  @ApiProperty({ example: 'Write code', description: 'Name of the task' })
  name: string;

  @ApiProperty({ example: 25, description: 'Duration of the task in minutes' })
  duration: number;

  @ApiProperty({ example: false, description: 'Whether the task is completed' })
  isCompleted: boolean;
}