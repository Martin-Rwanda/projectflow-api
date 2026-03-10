import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('sprint_task_assignments')
export class SprintTaskAssignmentOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'sprint_id' })
  sprintId: string;

  @Column({ name: 'task_id' })
  taskId: string;

  @Column({ name: 'added_by' })
  addedBy: string;

  @CreateDateColumn({ name: 'added_at', type: 'timestamptz' })
  addedAt: Date;
}
