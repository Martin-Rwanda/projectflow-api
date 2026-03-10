import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, Matches, IsOptional, IsIn } from 'class-validator';
import type { ProjectVisibility } from '../../domain/entities/project.entity';

export class CreateProjectDto {
  @ApiProperty({ example: 'Backend API' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'backend-api' })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Matches(/^[a-z0-9-]+$/, { message: 'Slug must be lowercase alphanumeric with hyphens' })
  slug: string;

  @ApiPropertyOptional({ example: 'Main backend API project' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: '���' })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiPropertyOptional({ example: '#3B82F6' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({ enum: ['public_to_org', 'private'], default: 'public_to_org' })
  @IsOptional()
  @IsIn(['public_to_org', 'private'])
  visibility?: ProjectVisibility;
}
