import { Comment } from '../entities/comment.entity';

export const COMMENT_REPOSITORY = Symbol('ICommentRepository');

export interface ICommentRepository {
  findById(id: string, orgId: string): Promise<Comment | null>;
  findAllByTask(taskId: string, orgId: string): Promise<Comment[]>;
  save(comment: Comment): Promise<Comment>;
  update(comment: Comment): Promise<Comment>;
}
