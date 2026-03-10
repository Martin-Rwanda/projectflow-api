import { Task } from '../../../domain/entities/task.entity';
import { TaskOrmEntity } from './task.orm-entity';

export class TaskMapper {
  static toDomain(orm: TaskOrmEntity): Task {
    return new Task({
      id: orm.id,
      orgId: orm.orgId,
      projectId: orm.projectId,
      title: orm.title,
      description: orm.description,
      statusId: orm.statusId,
      priority: orm.priority,
      assigneeId: orm.assigneeId,
      reporterId: orm.reporterId,
      parentTaskId: orm.parentTaskId,
      order: orm.order,
      dueDate: orm.dueDate,
      startedAt: orm.startedAt,
      completedAt: orm.completedAt,
      estimatedHours: orm.estimatedHours,
      loggedHours: orm.loggedHours,
      createdBy: orm.createdBy,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      deletedAt: orm.deletedAt,
    });
  }

  static toOrm(domain: Task): TaskOrmEntity {
    const orm = new TaskOrmEntity();
    orm.id = domain.id;
    orm.orgId = domain.orgId;
    orm.projectId = domain.projectId;
    orm.title = domain.title;
    orm.description = domain.description;
    orm.statusId = domain.statusId;
    orm.priority = domain.priority;
    orm.assigneeId = domain.assigneeId;
    orm.reporterId = domain.reporterId;
    orm.parentTaskId = domain.parentTaskId;
    orm.order = domain.order;
    orm.dueDate = domain.dueDate;
    orm.startedAt = domain.startedAt;
    orm.completedAt = domain.completedAt;
    orm.estimatedHours = domain.estimatedHours;
    orm.loggedHours = domain.loggedHours;
    orm.createdBy = domain.createdBy;
    orm.createdAt = domain.createdAt;
    orm.updatedAt = domain.updatedAt;
    orm.deletedAt = domain.deletedAt;
    return orm;
  }
}
