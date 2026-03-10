import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('active_timers')
export class ActiveTimerOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'user_id', unique: true })
  userId: string;

  @Column({ name: 'org_id' })
  orgId: string;

  @Column({ name: 'task_id' })
  taskId: string;

  @Column({ name: 'time_entry_id' })
  timeEntryId: string;

  @Column({ name: 'started_at', type: 'timestamptz' })
  startedAt: Date;
}
