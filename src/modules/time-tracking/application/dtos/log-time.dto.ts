import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsDateString, IsOptional, IsString } from 'class-validator';

export class LogTimeDto {
  @ApiProperty({ example: 'task-uuid' })
  @IsUUID()
  taskId: string;

  @ApiProperty({ example: '2026-03-10T09:00:00Z' })
  @IsDateString()
  startedAt: string;

  @ApiProperty({ example: '2026-03-10T11:00:00Z' })
  @IsDateString()
  endedAt: string;

  @ApiPropertyOptional({ example: 'Worked on auth module' })
  @IsOptional()
  @IsString()
  description?: string;
}
