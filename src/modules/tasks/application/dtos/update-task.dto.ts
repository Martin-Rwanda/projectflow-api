import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsIn,
  IsUUID,
  IsDateString,
  IsNumber,
} from 'class-validator';
import type { TaskPriority } from '../../domain/entities/task.entity';

export class UpdateTaskDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  description?: object;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  statusId?: string;

  @ApiPropertyOptional({ enum: ['none', 'low', 'medium', 'high', 'urgent'] })
  @IsOptional()
  @IsIn(['none', 'low', 'medium', 'high', 'urgent'])
  priority?: TaskPriority;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  assigneeId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  estimatedHours?: number;
}
