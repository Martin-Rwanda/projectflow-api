import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class ToggleReactionDto {
  @ApiProperty({ example: 'Ì±ç' })
  @IsString()
  @MaxLength(10)
  emoji: string;
}
