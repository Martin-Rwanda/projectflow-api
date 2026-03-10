import { ActiveTimer } from '../../../domain/entities/active-timer.entity';
import { ActiveTimerOrmEntity } from './active-timer.orm-entity';

export class ActiveTimerMapper {
  static toDomain(orm: ActiveTimerOrmEntity): ActiveTimer {
    return new ActiveTimer({
      id: orm.id,
      userId: orm.userId,
      orgId: orm.orgId,
      taskId: orm.taskId,
      timeEntryId: orm.timeEntryId,
      startedAt: orm.startedAt,
    });
  }

  static toOrm(domain: ActiveTimer): ActiveTimerOrmEntity {
    const orm = new ActiveTimerOrmEntity();
    orm.id = domain.id;
    orm.userId = domain.userId;
    orm.orgId = domain.orgId;
    orm.taskId = domain.taskId;
    orm.timeEntryId = domain.timeEntryId;
    orm.startedAt = domain.startedAt;
    return orm;
  }
}
