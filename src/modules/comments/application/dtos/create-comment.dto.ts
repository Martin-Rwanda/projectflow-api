import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsObject, IsUUID, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCommentDto {
  @ApiProperty({ example: 'task-uuid' })
  @IsUUID()
  taskId: string;

  @ApiProperty({
    example: {
      type: 'doc',
      content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Great work!' }] }],
    },
  })
  @IsObject()
  body: object;

  @ApiPropertyOptional({ example: null })
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  @IsUUID()
  parentCommentId?: string;
}
