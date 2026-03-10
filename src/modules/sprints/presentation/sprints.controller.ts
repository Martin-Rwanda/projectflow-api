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
import { CreateSprintDto } from '../application/dtos/create-sprint.dto';
import { StartSprintDto } from '../application/dtos/start-sprint.dto';
import { AddTaskToSprintDto } from '../application/dtos/add-task-to-sprint.dto';
import { CreateSprintCommand } from '../application/commands/create-sprint.command';
import { StartSprintCommand } from '../application/commands/start-sprint.command';
import { CompleteSprintCommand } from '../application/commands/complete-sprint.command';
import { AddTaskToSprintCommand } from '../application/commands/add-task-to-sprint.command';
import { RemoveTaskFromSprintCommand } from '../application/commands/remove-task-from-sprint.command';
import { GetSprintQuery } from '../application/queries/get-sprint.query';
import { ListSprintsQuery } from '../application/queries/list-sprints.query';

@ApiTags('Sprints')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('member')
@Controller('organizations/:orgSlug/sprints')
export class SprintsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Roles('admin')
  @ApiParam({ name: 'orgSlug', example: 'acme-inc' })
  @ApiOperation({ summary: 'Create a new sprint' })
  create(@OrgId() orgId: string, @Body() dto: CreateSprintDto, @CurrentUser() user: any) {
    return this.commandBus.execute(
      new CreateSprintCommand(orgId, dto.projectId, dto.name, dto.goal ?? null, user.id),
    );
  }

  @Get()
  @ApiParam({ name: 'orgSlug', example: 'acme-inc' })
  @ApiOperation({ summary: 'List sprints by project' })
  list(@OrgId() orgId: string, @Query('projectId') projectId: string) {
    return this.queryBus.execute(new ListSprintsQuery(projectId, orgId));
  }

  @Get(':sprintId')
  @ApiParam({ name: 'orgSlug', example: 'acme-inc' })
  @ApiParam({ name: 'sprintId', example: 'sprint-uuid' })
  @ApiOperation({ summary: 'Get sprint details with tasks' })
  getOne(@Param('sprintId') sprintId: string, @OrgId() orgId: string) {
    return this.queryBus.execute(new GetSprintQuery(sprintId, orgId));
  }

  @Patch(':sprintId/start')
  @Roles('admin')
  @ApiParam({ name: 'orgSlug', example: 'acme-inc' })
  @ApiParam({ name: 'sprintId', example: 'sprint-uuid' })
  @ApiOperation({ summary: 'Start a sprint' })
  start(@Param('sprintId') sprintId: string, @OrgId() orgId: string, @Body() dto: StartSprintDto) {
    return this.commandBus.execute(
      new StartSprintCommand(sprintId, orgId, new Date(dto.startDate), new Date(dto.endDate)),
    );
  }

  @Patch(':sprintId/complete')
  @Roles('admin')
  @ApiParam({ name: 'orgSlug', example: 'acme-inc' })
  @ApiParam({ name: 'sprintId', example: 'sprint-uuid' })
  @ApiOperation({ summary: 'Complete a sprint' })
  complete(@Param('sprintId') sprintId: string, @OrgId() orgId: string) {
    return this.commandBus.execute(new CompleteSprintCommand(sprintId, orgId));
  }

  @Post(':sprintId/tasks')
  @ApiParam({ name: 'orgSlug', example: 'acme-inc' })
  @ApiParam({ name: 'sprintId', example: 'sprint-uuid' })
  @ApiOperation({ summary: 'Add task to sprint' })
  addTask(
    @Param('sprintId') sprintId: string,
    @OrgId() orgId: string,
    @Body() dto: AddTaskToSprintDto,
    @CurrentUser() user: any,
  ) {
    return this.commandBus.execute(
      new AddTaskToSprintCommand(sprintId, dto.taskId, orgId, user.id),
    );
  }

  @Delete(':sprintId/tasks/:taskId')
  @ApiParam({ name: 'orgSlug', example: 'acme-inc' })
  @ApiParam({ name: 'sprintId', example: 'sprint-uuid' })
  @ApiParam({ name: 'taskId', example: 'task-uuid' })
  @ApiOperation({ summary: 'Remove task from sprint' })
  removeTask(
    @Param('sprintId') sprintId: string,
    @Param('taskId') taskId: string,
    @OrgId() orgId: string,
  ) {
    return this.commandBus.execute(new RemoveTaskFromSprintCommand(sprintId, taskId, orgId));
  }
}
