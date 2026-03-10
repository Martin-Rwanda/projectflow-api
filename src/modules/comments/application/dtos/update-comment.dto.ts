import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty()
  @IsObject()
  body: object;
}
