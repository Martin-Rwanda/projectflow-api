import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { OrgId } from '../../../common/decorators/org-id.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { StartTimerDto } from '../application/dtos/start-timer.dto';
import { LogTimeDto } from '../application/dtos/log-time.dto';
import { StartTimerCommand } from '../application/commands/start-timer.command';
import { StopTimerCommand } from '../application/commands/stop-timer.command';
import { LogTimeCommand } from '../application/commands/log-time.command';
import { GetActiveTimerQuery } from '../application/queries/get-active-timer.query';
import { ListTimeEntriesQuery } from '../application/queries/list-time-entries.query';

@ApiTags('Time Tracking')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('member')
@Controller('organizations/:orgSlug/time')
export class TimeTrackingController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('start')
  @ApiParam({ name: 'orgSlug', example: 'acme-inc' })
  @ApiOperation({ summary: 'Start a timer on a task' })
  startTimer(@OrgId() orgId: string, @Body() dto: StartTimerDto, @CurrentUser() user: any) {
    return this.commandBus.execute(
      new StartTimerCommand(user.id, orgId, dto.taskId, dto.description ?? null),
    );
  }

  @Post('stop')
  @ApiParam({ name: 'orgSlug', example: 'acme-inc' })
  @ApiOperation({ summary: 'Stop the current running timer' })
  stopTimer(@OrgId() orgId: string, @CurrentUser() user: any) {
    return this.commandBus.execute(new StopTimerCommand(user.id, orgId));
  }

  @Post('log')
  @ApiParam({ name: 'orgSlug', example: 'acme-inc' })
  @ApiOperation({ summary: 'Manually log time on a task' })
  logTime(@OrgId() orgId: string, @Body() dto: LogTimeDto, @CurrentUser() user: any) {
    return this.commandBus.execute(
      new LogTimeCommand(
        user.id,
        orgId,
        dto.taskId,
        new Date(dto.startedAt),
        new Date(dto.endedAt),
        dto.description ?? null,
      ),
    );
  }

  @Get('active')
  @ApiParam({ name: 'orgSlug', example: 'acme-inc' })
  @ApiOperation({ summary: 'Get current active timer for the user' })
  getActiveTimer(@CurrentUser() user: any) {
    return this.queryBus.execute(new GetActiveTimerQuery(user.id));
  }

  @Get('entries')
  @ApiParam({ name: 'orgSlug', example: 'acme-inc' })
  @ApiOperation({ summary: 'List time entries by task or user' })
  listEntries(
    @OrgId() orgId: string,
    @Query('taskId') taskId?: string,
    @Query('userId') userId?: string,
  ) {
    return this.queryBus.execute(new ListTimeEntriesQuery(orgId, taskId, userId));
  }
}
