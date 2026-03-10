import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { TaskPriority } from '../../../domain/entities/task.entity';

@Entity('tasks')
export class TaskOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'org_id' })
  orgId: string;

  @Column({ name: 'project_id' })
  projectId: string;

  @Column()
  title: string;

  @Column({ nullable: true, type: 'jsonb' })
  description: object | null;

  @Column({ name: 'status_id' })
  statusId: string;

  @Column({ type: 'varchar', default: 'none' })
  priority: TaskPriority;

  @Column({ name: 'assignee_id', nullable: true, type: 'varchar' })
  assigneeId: string | null;

  @Column({ name: 'reporter_id' })
  reporterId: string;

  @Column({ name: 'parent_task_id', nullable: true, type: 'varchar' })
  parentTaskId: string | null;

  @Column({ type: 'float', default: 0 })
  order: number;

  @Column({ name: 'due_date', nullable: true, type: 'timestamptz' })
  dueDate: Date | null;

  @Column({ name: 'started_at', nullable: true, type: 'timestamptz' })
  startedAt: Date | null;

  @Column({ name: 'completed_at', nullable: true, type: 'timestamptz' })
  completedAt: Date | null;

  @Column({ name: 'estimated_hours', nullable: true, type: 'float' })
  estimatedHours: number | null;

  @Column({ name: 'logged_hours', type: 'float', default: 0 })
  loggedHours: number;

  @Column({ name: 'created_by' })
  createdBy: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
