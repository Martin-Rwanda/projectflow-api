import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException, ForbiddenException } from '@nestjs/common';
import { UpdateCommentCommand } from '../commands/update-comment.command';
import type { ICommentRepository } from '../../domain/repositories/comment.repository.interface';
import { COMMENT_REPOSITORY } from '../../domain/repositories/comment.repository.interface';

@CommandHandler(UpdateCommentCommand)
export class UpdateCommentHandler implements ICommandHandler<UpdateCommentCommand> {
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private readonly commentRepository: ICommentRepository,
  ) {}

  async execute(command: UpdateCommentCommand) {
    const comment = await this.commentRepository.findById(command.commentId, command.orgId);
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.authorId !== command.userId)
      throw new ForbiddenException('You can only edit your own comments');

    const updated = await this.commentRepository.update(comment.edit(command.body));

    return {
      id: updated.id,
      body: updated.body,
      isEdited: updated.isEdited,
      updatedAt: updated.updatedAt,
    };
  }
}
