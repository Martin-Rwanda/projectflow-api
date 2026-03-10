import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsOptional, IsUUID } from 'class-validator';

export class CreateSprintDto {
  @ApiProperty({ example: 'Sprint 1' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({ example: 'Complete authentication module' })
  @IsOptional()
  @IsString()
  goal?: string;

  @ApiProperty({ example: 'project-uuid' })
  @IsUUID()
  projectId: string;
}
