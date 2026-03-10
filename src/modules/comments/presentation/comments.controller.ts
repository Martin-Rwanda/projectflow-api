import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { OrgId } from '../../../common/decorators/org-id.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CreateCommentDto } from '../application/dtos/create-comment.dto';
import { UpdateCommentDto } from '../application/dtos/update-comment.dto';
import { ToggleReactionDto } from '../application/dtos/toggle-reaction.dto';
import { CreateCommentCommand } from '../application/commands/create-comment.command';
import { UpdateCommentCommand } from '../application/commands/update-comment.command';
import { DeleteCommentCommand } from '../application/commands/delete-comment.command';
import { ToggleReactionCommand } from '../application/commands/toggle-reaction.command';
import { ListCommentsQuery } from '../application/queries/list-comments.query';

@ApiTags('Comments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('member')
@Controller('organizations/:orgSlug/comments')
export class CommentsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiParam({ name: 'orgSlug', example: 'acme-inc' })
  @ApiOperation({ summary: 'Create a comment on a task' })
  create(@OrgId() orgId: string, @Body() dto: CreateCommentDto, @CurrentUser() user: any) {
    return this.commandBus.execute(
      new CreateCommentCommand(orgId, dto.taskId, user.id, dto.body, dto.parentCommentId ?? null),
    );
  }

  @Get('task/:taskId')
  @ApiParam({ name: 'orgSlug', example: 'acme-inc' })
  @ApiParam({ name: 'taskId', example: 'task-uuid' })
  @ApiOperation({ summary: 'List comments for a task' })
  list(@Param('taskId') taskId: string, @OrgId() orgId: string) {
    return this.queryBus.execute(new ListCommentsQuery(taskId, orgId));
  }

  @Patch(':commentId')
  @ApiParam({ name: 'orgSlug', example: 'acme-inc' })
  @ApiParam({ name: 'commentId', example: 'comment-uuid' })
  @ApiOperation({ summary: 'Update a comment' })
  update(
    @Param('commentId') commentId: string,
    @OrgId() orgId: string,
    @Body() dto: UpdateCommentDto,
    @CurrentUser() user: any,
  ) {
    return this.commandBus.execute(new UpdateCommentCommand(commentId, orgId, user.id, dto.body));
  }

  @Delete(':commentId')
  @ApiParam({ name: 'orgSlug', example: 'acme-inc' })
  @ApiParam({ name: 'commentId', example: 'comment-uuid' })
  @ApiOperation({ summary: 'Delete a comment' })
  delete(@Param('commentId') commentId: string, @OrgId() orgId: string, @CurrentUser() user: any) {
    return this.commandBus.execute(new DeleteCommentCommand(commentId, orgId, user.id));
  }

  @Post(':commentId/reactions')
  @ApiParam({ name: 'orgSlug', example: 'acme-inc' })
  @ApiParam({ name: 'commentId', example: 'comment-uuid' })
  @ApiOperation({ summary: 'Toggle a reaction on a comment' })
  toggleReaction(
    @Param('commentId') commentId: string,
    @Body() dto: ToggleReactionDto,
    @CurrentUser() user: any,
  ) {
    return this.commandBus.execute(new ToggleReactionCommand(commentId, user.id, dto.emoji));
  }
}
