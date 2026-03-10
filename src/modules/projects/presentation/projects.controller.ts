import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { OrgId } from '../../../common/decorators/org-id.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CreateProjectDto } from '../application/dtos/create-project.dto';
import { CreateProjectCommand } from '../application/commands/create-project.command';
import { GetProjectQuery } from '../application/queries/get-project.query';
import { ListProjectsQuery } from '../application/queries/list-projects.query';

@ApiTags('Projects')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('member')
@Controller('organizations/:orgSlug/projects')
export class ProjectsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Roles('admin')
  @ApiParam({ name: 'orgSlug', example: 'acme-inc' })
  @ApiOperation({ summary: 'Create a new project' })
  create(@OrgId() orgId: string, @Body() dto: CreateProjectDto, @CurrentUser() user: any) {
    return this.commandBus.execute(
      new CreateProjectCommand(
        orgId,
        dto.name,
        dto.slug,
        dto.description ?? null,
        dto.icon ?? null,
        dto.color ?? null,
        dto.visibility ?? 'public_to_org',
        user.id,
      ),
    );
  }

  @Get()
  @ApiParam({ name: 'orgSlug', example: 'acme-inc' })
  @ApiOperation({ summary: 'List all projects in organization' })
  list(@OrgId() orgId: string) {
    return this.queryBus.execute(new ListProjectsQuery(orgId));
  }

  @Get(':projectId')
  @ApiParam({ name: 'orgSlug', example: 'acme-inc' })
  @ApiParam({ name: 'projectId', example: 'project-uuid' })
  @ApiOperation({ summary: 'Get project details' })
  getOne(@Param('projectId') projectId: string, @OrgId() orgId: string) {
    return this.queryBus.execute(new GetProjectQuery(projectId, orgId));
  }
}
