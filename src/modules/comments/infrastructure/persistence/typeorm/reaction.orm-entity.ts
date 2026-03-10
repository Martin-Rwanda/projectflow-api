import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('reactions')
export class ReactionOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'comment_id' })
  commentId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  emoji: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
