import { Comment } from '../../../domain/entities/comment.entity';
import { CommentOrmEntity } from './comment.orm-entity';

export class CommentMapper {
  static toDomain(orm: CommentOrmEntity): Comment {
    return new Comment({
      id: orm.id,
      orgId: orm.orgId,
      taskId: orm.taskId,
      authorId: orm.authorId,
      body: orm.body,
      isEdited: orm.isEdited,
      parentCommentId: orm.parentCommentId,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      deletedAt: orm.deletedAt,
    });
  }

  static toOrm(domain: Comment): CommentOrmEntity {
    const orm = new CommentOrmEntity();
    orm.id = domain.id;
    orm.orgId = domain.orgId;
    orm.taskId = domain.taskId;
    orm.authorId = domain.authorId;
    orm.body = domain.body;
    orm.isEdited = domain.isEdited;
    orm.parentCommentId = domain.parentCommentId;
    orm.createdAt = domain.createdAt;
    orm.updatedAt = domain.updatedAt;
    orm.deletedAt = domain.deletedAt;
    return orm;
  }
}
