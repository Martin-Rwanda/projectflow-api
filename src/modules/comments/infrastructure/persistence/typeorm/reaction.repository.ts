import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { IReactionRepository } from '../../../domain/repositories/reaction.repository.interface';
import { Reaction } from '../../../domain/entities/reaction.entity';
import { ReactionOrmEntity } from './reaction.orm-entity';
import { ReactionMapper } from './reaction.mapper';

@Injectable()
export class ReactionRepository implements IReactionRepository {
  constructor(
    @InjectRepository(ReactionOrmEntity)
    private readonly repo: Repository<ReactionOrmEntity>,
  ) {}

  async findByCommentUserEmoji(
    commentId: string,
    userId: string,
    emoji: string,
  ): Promise<Reaction | null> {
    const orm = await this.repo.findOne({ where: { commentId, userId, emoji } });
    return orm ? ReactionMapper.toDomain(orm) : null;
  }

  async findAllByComment(commentId: string): Promise<Reaction[]> {
    const orms = await this.repo.find({ where: { commentId } });
    return orms.map(ReactionMapper.toDomain);
  }

  async save(reaction: Reaction): Promise<Reaction> {
    const orm = ReactionMapper.toOrm(reaction);
    const saved = await this.repo.save(orm);
    return ReactionMapper.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
