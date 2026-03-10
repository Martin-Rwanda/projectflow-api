import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException, ForbiddenException } from '@nestjs/common';
import { DeleteCommentCommand } from '../commands/delete-comment.command';
import type { ICommentRepository } from '../../domain/repositories/comment.repository.interface';
import { COMMENT_REPOSITORY } from '../../domain/repositories/comment.repository.interface';

@CommandHandler(DeleteCommentCommand)
export class DeleteCommentHandler implements ICommandHandler<DeleteCommentCommand> {
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private readonly commentRepository: ICommentRepository,
  ) {}

  async execute(command: DeleteCommentCommand) {
    const comment = await this.commentRepository.findById(command.commentId, command.orgId);
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.authorId !== command.userId)
      throw new ForbiddenException('You can only delete your own comments');

    await this.commentRepository.update(comment.softDelete());
    return { message: 'Comment deleted successfully' };
  }
}
