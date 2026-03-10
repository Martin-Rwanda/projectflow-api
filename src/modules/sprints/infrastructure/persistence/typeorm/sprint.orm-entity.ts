import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import type { SprintStatus } from '../../../domain/entities/sprint.entity';

@Entity('sprints')
export class SprintOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'org_id' })
  orgId: string;

  @Column({ name: 'project_id' })
  projectId: string;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  goal: string | null;

  @Column({ type: 'varchar', default: 'planning' })
  status: SprintStatus;

  @Column({ name: 'start_date', nullable: true, type: 'timestamptz' })
  startDate: Date | null;

  @Column({ name: 'end_date', nullable: true, type: 'timestamptz' })
  endDate: Date | null;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'completed_at', nullable: true, type: 'timestamptz' })
  completedAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
