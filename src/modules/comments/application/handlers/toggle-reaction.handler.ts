import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ToggleReactionCommand } from '../commands/toggle-reaction.command';
import type { IReactionRepository } from '../../domain/repositories/reaction.repository.interface';
import { REACTION_REPOSITORY } from '../../domain/repositories/reaction.repository.interface';
import { Reaction } from '../../domain/entities/reaction.entity';

@CommandHandler(ToggleReactionCommand)
export class ToggleReactionHandler implements ICommandHandler<ToggleReactionCommand> {
  constructor(
    @Inject(REACTION_REPOSITORY)
    private readonly reactionRepository: IReactionRepository,
  ) {}

  async execute(command: ToggleReactionCommand) {
    const existing = await this.reactionRepository.findByCommentUserEmoji(
      command.commentId,
      command.userId,
      command.emoji,
    );

    if (existing) {
      await this.reactionRepository.delete(existing.id);
      return { toggled: 'removed', emoji: command.emoji };
    }

    const reaction = Reaction.create({
      id: uuidv4(),
      commentId: command.commentId,
      userId: command.userId,
      emoji: command.emoji,
    });

    await this.reactionRepository.save(reaction);
    return { toggled: 'added', emoji: command.emoji };
  }
}
