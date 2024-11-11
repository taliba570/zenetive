import { ApiProperty } from '@nestjs/swagger';

export class UpdateLabelDto {
  @ApiProperty({ example: 'work', description: 'Task label', required: false })
  readonly name?: string;

  @ApiProperty({
    example: '#FF00FF',
    description: 'Color for label',
    required: false,
  })
  readonly color?: string;
}
