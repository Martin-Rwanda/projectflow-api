import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AddTaskToSprintDto {
  @ApiProperty({ example: 'task-uuid' })
  @IsUUID()
  taskId: string;
}
