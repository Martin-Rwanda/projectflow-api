import { TaskStatus } from '../../../domain/entities/task-status.entity';
import { TaskStatusOrmEntity } from './task-status.orm-entity';

export class TaskStatusMapper {
  static toDomain(orm: TaskStatusOrmEntity): TaskStatus {
    return new TaskStatus({
      id: orm.id,
      projectId: orm.projectId,
      orgId: orm.orgId,
      name: orm.name,
      color: orm.color,
      category: orm.category,
      position: orm.position,
      isDefault: orm.isDefault,
      createdAt: orm.createdAt,
    });
  }

  static toOrm(domain: TaskStatus): TaskStatusOrmEntity {
    const orm = new TaskStatusOrmEntity();
    orm.id = domain.id;
    orm.projectId = domain.projectId;
    orm.orgId = domain.orgId;
    orm.name = domain.name;
    orm.color = domain.color;
    orm.category = domain.category;
    orm.position = domain.position;
    orm.isDefault = domain.isDefault;
    orm.createdAt = domain.createdAt;
    return orm;
  }
}
