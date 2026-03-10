import { Reaction } from '../entities/reaction.entity';

export const REACTION_REPOSITORY = Symbol('IReactionRepository');

export interface IReactionRepository {
  findByCommentUserEmoji(
    commentId: string,
    userId: string,
    emoji: string,
  ): Promise<Reaction | null>;
  findAllByComment(commentId: string): Promise<Reaction[]>;
  save(reaction: Reaction): Promise<Reaction>;
  delete(id: string): Promise<void>;
}
