import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('time_entries')
export class TimeEntryOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'org_id' })
  orgId: string;

  @Column({ name: 'task_id' })
  taskId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ nullable: true, type: 'text' })
  description: string | null;

  @Column({ name: 'started_at', type: 'timestamptz' })
  startedAt: Date;

  @Column({ name: 'ended_at', nullable: true, type: 'timestamptz' })
  endedAt: Date | null;

  @Column({ name: 'duration_seconds', nullable: true, type: 'integer' })
  durationSeconds: number | null;

  @Column({ name: 'is_running', default: true })
  isRunning: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
