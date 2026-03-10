import { TimeEntry } from '../../../domain/entities/time-entry.entity';
import { TimeEntryOrmEntity } from './time-entry.orm-entity';

export class TimeEntryMapper {
  static toDomain(orm: TimeEntryOrmEntity): TimeEntry {
    return new TimeEntry({
      id: orm.id,
      orgId: orm.orgId,
      taskId: orm.taskId,
      userId: orm.userId,
      description: orm.description,
      startedAt: orm.startedAt,
      endedAt: orm.endedAt,
      durationSeconds: orm.durationSeconds,
      isRunning: orm.isRunning,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }

  static toOrm(domain: TimeEntry): TimeEntryOrmEntity {
    const orm = new TimeEntryOrmEntity();
    orm.id = domain.id;
    orm.orgId = domain.orgId;
    orm.taskId = domain.taskId;
    orm.userId = domain.userId;
    orm.description = domain.description;
    orm.startedAt = domain.startedAt;
    orm.endedAt = domain.endedAt;
    orm.durationSeconds = domain.durationSeconds;
    orm.isRunning = domain.isRunning;
    orm.createdAt = domain.createdAt;
    orm.updatedAt = domain.updatedAt;
    return orm;
  }
}
