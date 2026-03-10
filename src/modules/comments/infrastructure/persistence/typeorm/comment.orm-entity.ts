import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('comments')
export class CommentOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'org_id' })
  orgId: string;

  @Column({ name: 'task_id' })
  taskId: string;

  @Column({ name: 'author_id' })
  authorId: string;

  @Column({ type: 'jsonb' })
  body: object;

  @Column({ name: 'is_edited', default: false })
  isEdited: boolean;

  @Column({ name: 'parent_comment_id', nullable: true, type: 'varchar' })
  parentCommentId: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
