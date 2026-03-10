import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { OrgId } from '../../../common/decorators/org-id.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CreateOrganizationDto } from '../application/dtos/create-organization.dto';
import { InviteMemberDto } from '../application/dtos/invite-member.dto';
import { CreateOrganizationCommand } from '../application/commands/create-organization.command';
import { InviteMemberCommand } from '../application/commands/invite-member.command';
import { AcceptInvitationCommand } from '../application/commands/accept-invitation.command';
import { GetOrganizationQuery } from '../application/queries/get-organization.query';

@ApiTags('Organizations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('organizations')
export class OrganizationsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new organization' })
  create(@Body() dto: CreateOrganizationDto, @CurrentUser() user: any) {
    return this.commandBus.execute(new CreateOrganizationCommand(dto.name, dto.slug, user.id));
  }

  @Get(':orgSlug')
  @UseGuards(RolesGuard)
  @Roles('member')
  @ApiParam({ name: 'orgSlug', example: 'acme-inc' })
  @ApiOperation({ summary: 'Get organization details' })
  getOne(@OrgId() orgId: string) {
    return this.queryBus.execute(new GetOrganizationQuery(orgId));
  }

  @Post(':orgSlug/invitations')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiParam({ name: 'orgSlug', example: 'acme-inc' })
  @ApiOperation({ summary: 'Invite a member to the organization' })
  invite(@OrgId() orgId: string, @Body() dto: InviteMemberDto, @CurrentUser() user: any) {
    return this.commandBus.execute(new InviteMemberCommand(orgId, dto.email, dto.role, user.id));
  }

  @Post('invitations/:token/accept')
  @ApiParam({ name: 'token' })
  @ApiOperation({ summary: 'Accept an organization invitation' })
  acceptInvitation(@Param('token') token: string, @CurrentUser() user: any) {
    return this.commandBus.execute(new AcceptInvitationCommand(token, user.id));
  }
}
