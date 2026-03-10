import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateCommentCommand } from '../commands/create-comment.command';
import type { ICommentRepository } from '../../domain/repositories/comment.repository.interface';
import { COMMENT_REPOSITORY } from '../../domain/repositories/comment.repository.interface';
import { Comment } from '../../domain/entities/comment.entity';

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler implements ICommandHandler<CreateCommentCommand> {
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private readonly commentRepository: ICommentRepository,
  ) {}

  async execute(command: CreateCommentCommand) {
    const comment = Comment.create({
      id: uuidv4(),
      orgId: command.orgId,
      taskId: command.taskId,
      authorId: command.authorId,
      body: command.body,
      parentCommentId: command.parentCommentId,
    });

    const saved = await this.commentRepository.save(comment);

    return {
      id: saved.id,
      taskId: saved.taskId,
      authorId: saved.authorId,
      body: saved.body,
      isEdited: saved.isEdited,
      parentCommentId: saved.parentCommentId,
      createdAt: saved.createdAt,
    };
  }
}
