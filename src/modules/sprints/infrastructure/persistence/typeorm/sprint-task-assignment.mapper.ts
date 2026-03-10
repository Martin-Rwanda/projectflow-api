import { SprintTaskAssignment } from '../../../domain/entities/sprint-task-assignment.entity';
import { SprintTaskAssignmentOrmEntity } from './sprint-task-assignment.orm-entity';

export class SprintTaskAssignmentMapper {
  static toDomain(orm: SprintTaskAssignmentOrmEntity): SprintTaskAssignment {
    return new SprintTaskAssignment({
      id: orm.id,
      sprintId: orm.sprintId,
      taskId: orm.taskId,
      addedBy: orm.addedBy,
      addedAt: orm.addedAt,
    });
  }

  static toOrm(domain: SprintTaskAssignment): SprintTaskAssignmentOrmEntity {
    const orm = new SprintTaskAssignmentOrmEntity();
    orm.id = domain.id;
    orm.sprintId = domain.sprintId;
    orm.taskId = domain.taskId;
    orm.addedBy = domain.addedBy;
    orm.addedAt = domain.addedAt;
    return orm;
  }
}
