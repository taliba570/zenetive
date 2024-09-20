import { ApiProperty } from "@nestjs/swagger";

export class CreateLabelDto {
  @ApiProperty({ example: 'work', description: 'Label name' })
  readonly name: string;

  @ApiProperty({ example: '#FF00FF', description: 'Color for label in HEX format' })
  readonly color: string;
}