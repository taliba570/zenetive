import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString } from 'class-validator';

export class DateRangeDto {
  @ApiProperty({ description: 'Start date for the range in ISO format' })
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty({ description: 'End date for the range in ISO format' })
  @IsNotEmpty()
  @IsDateString()
  endDate: string;
}