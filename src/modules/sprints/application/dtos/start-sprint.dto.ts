import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class StartSprintDto {
  @ApiProperty({ example: '2026-03-01' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2026-03-14' })
  @IsDateString()
  endDate: string;
}
