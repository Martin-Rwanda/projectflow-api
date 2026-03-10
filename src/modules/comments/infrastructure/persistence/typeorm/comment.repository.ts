import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { ICommentRepository } from '../../../domain/repositories/comment.repository.interface';
import { Comment } from '../../../domain/entities/comment.entity';
import { CommentOrmEntity } from './comment.orm-entity';
import { CommentMapper } from './comment.mapper';

@Injectable()
export class CommentRepository implements ICommentRepository {
  constructor(
    @InjectRepository(CommentOrmEntity)
    private readonly repo: Repository<CommentOrmEntity>,
  ) {}

  async findById(id: string, orgId: string): Promise<Comment | null> {
    const orm = await this.repo.findOne({ where: { id, orgId } });
    return orm ? CommentMapper.toDomain(orm) : null;
  }

  async findAllByTask(taskId: string, orgId: string): Promise<Comment[]> {
    const orms = await this.repo.find({
      where: { taskId, orgId },
      order: { createdAt: 'ASC' },
    });
    return orms.map(CommentMapper.toDomain);
  }

  async save(comment: Comment): Promise<Comment> {
    const orm = CommentMapper.toOrm(comment);
    const saved = await this.repo.save(orm);
    return CommentMapper.toDomain(saved);
  }

  async update(comment: Comment): Promise<Comment> {
    const orm = CommentMapper.toOrm(comment);
    const updated = await this.repo.save(orm);
    return CommentMapper.toDomain(updated);
  }
}
