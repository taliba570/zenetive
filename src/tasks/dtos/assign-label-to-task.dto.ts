import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export class AssignLabelToTask {
  @ApiProperty({ example: '', description: 'Task ID' })
  readonly taskId: string;

  @ApiProperty({ example: '[]', description: 'Array of label IDs', type: [String] })
  readonly labelIds: Types.ObjectId[];
}