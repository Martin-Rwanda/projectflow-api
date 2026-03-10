import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListCommentsQuery } from '../queries/list-comments.query';
import type { ICommentRepository } from '../../domain/repositories/comment.repository.interface';
import { COMMENT_REPOSITORY } from '../../domain/repositories/comment.repository.interface';
import type { IReactionRepository } from '../../domain/repositories/reaction.repository.interface';
import { REACTION_REPOSITORY } from '../../domain/repositories/reaction.repository.interface';

@QueryHandler(ListCommentsQuery)
export class ListCommentsHandler implements IQueryHandler<ListCommentsQuery> {
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private readonly commentRepository: ICommentRepository,
    @Inject(REACTION_REPOSITORY)
    private readonly reactionRepository: IReactionRepository,
  ) {}

  async execute(query: ListCommentsQuery) {
    const comments = await this.commentRepository.findAllByTask(query.taskId, query.orgId);

    const commentsWithReactions = await Promise.all(
      comments.map(async (c) => {
        const reactions = await this.reactionRepository.findAllByComment(c.id);
        const reactionSummary = reactions.reduce(
          (acc, r) => {
            acc[r.emoji] = (acc[r.emoji] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>,
        );

        return {
          id: c.id,
          taskId: c.taskId,
          authorId: c.authorId,
          body: c.body,
          isEdited: c.isEdited,
          parentCommentId: c.parentCommentId,
          reactions: reactionSummary,
          createdAt: c.createdAt,
          updatedAt: c.updatedAt,
        };
      }),
    );

    return commentsWithReactions;
  }
}
