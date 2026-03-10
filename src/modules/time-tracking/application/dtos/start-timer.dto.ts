import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsString } from 'class-validator';

export class StartTimerDto {
  @ApiProperty({ example: 'task-uuid' })
  @IsUUID()
  taskId: string;

  @ApiPropertyOptional({ example: 'Working on JWT implementation' })
  @IsOptional()
  @IsString()
  description?: string;
}
