import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { OrgId } from '../../../common/decorators/org-id.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CreateTaskDto } from '../application/dtos/create-task.dto';
import { UpdateTaskDto } from '../application/dtos/update-task.dto';
import { ListTasksDto } from '../application/dtos/list-tasks.dto';
import { CreateTaskCommand } from '../application/commands/create-task.command';
import { UpdateTaskCommand } from '../application/commands/update-task.command';
import { DeleteTaskCommand } from '../application/commands/delete-task.command';
import { GetTaskQuery } from '../application/queries/get-task.query';
import { ListTasksQuery } from '../application/queries/list-tasks.query';

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('member')
@Controller('organizations/:orgSlug/tasks')
export class TasksController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiParam({ name: 'orgSlug', example: 'acme-inc' })
  @ApiOperation({ summary: 'Create a new task' })
  create(@OrgId() orgId: string, @Body() dto: CreateTaskDto, @CurrentUser() user: any) {
    return this.commandBus.execute(
      new CreateTaskCommand(
        orgId,
        dto.projectId,
        dto.title,
        dto.description ?? null,
        dto.statusId ?? null,
        dto.priority ?? 'none',
        dto.assigneeId ?? null,
        dto.parentTaskId ?? null,
        dto.dueDate ? new Date(dto.dueDate) : null,
        dto.estimatedHours ?? null,
        user.id,
      ),
    );
  }

  @Get()
  @ApiParam({ name: 'orgSlug', example: 'acme-inc' })
  @ApiOperation({ summary: 'List tasks with filters and pagination' })
  list(@OrgId() orgId: string, @Query() query: ListTasksDto) {
    return this.queryBus.execute(
      new ListTasksQuery(
        orgId,
        {
          projectId: query.projectId,
          statusId: query.statusId,
          assigneeId: query.assigneeId,
          priority: query.priority,
        },
        { page: query.page ?? 1, limit: query.limit ?? 20 },
      ),
    );
  }

  @Get(':taskId')
  @ApiParam({ name: 'orgSlug', example: 'acme-inc' })
  @ApiParam({ name: 'taskId', example: 'task-uuid' })
  @ApiOperation({ summary: 'Get task details' })
  getOne(@Param('taskId') taskId: string, @OrgId() orgId: string) {
    return this.queryBus.execute(new GetTaskQuery(taskId, orgId));
  }

  @Patch(':taskId')
  @ApiParam({ name: 'orgSlug', example: 'acme-inc' })
  @ApiParam({ name: 'taskId', example: 'task-uuid' })
  @ApiOperation({ summary: 'Update a task' })
  update(@Param('taskId') taskId: string, @OrgId() orgId: string, @Body() dto: UpdateTaskDto) {
    return this.commandBus.execute(
      new UpdateTaskCommand(
        taskId,
        orgId,
        dto.title,
        dto.description,
        dto.statusId,
        dto.priority,
        dto.assigneeId,
        dto.dueDate ? new Date(dto.dueDate) : undefined,
        dto.estimatedHours,
      ),
    );
  }

  @Delete(':taskId')
  @ApiParam({ name: 'orgSlug', example: 'acme-inc' })
  @ApiParam({ name: 'taskId', example: 'task-uuid' })
  @ApiOperation({ summary: 'Delete a task' })
  delete(@Param('taskId') taskId: string, @OrgId() orgId: string) {
    return this.commandBus.execute(new DeleteTaskCommand(taskId, orgId));
  }
}
