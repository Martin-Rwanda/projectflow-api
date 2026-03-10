import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import type { StatusCategory } from '../../../domain/entities/task-status.entity';

@Entity('task_statuses')
export class TaskStatusOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'project_id' })
  projectId: string;

  @Column({ name: 'org_id' })
  orgId: string;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column({ type: 'varchar' })
  category: StatusCategory;

  @Column({ default: 0 })
  position: number;

  @Column({ name: 'is_default', default: false })
  isDefault: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
