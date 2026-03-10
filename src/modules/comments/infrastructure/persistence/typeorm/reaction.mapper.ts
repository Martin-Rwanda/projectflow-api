import { Reaction } from '../../../domain/entities/reaction.entity';
import { ReactionOrmEntity } from './reaction.orm-entity';

export class ReactionMapper {
  static toDomain(orm: ReactionOrmEntity): Reaction {
    return new Reaction({
      id: orm.id,
      commentId: orm.commentId,
      userId: orm.userId,
      emoji: orm.emoji,
      createdAt: orm.createdAt,
    });
  }

  static toOrm(domain: Reaction): ReactionOrmEntity {
    const orm = new ReactionOrmEntity();
    orm.id = domain.id;
    orm.commentId = domain.commentId;
    orm.userId = domain.userId;
    orm.emoji = domain.emoji;
    orm.createdAt = domain.createdAt;
    return orm;
  }
}
