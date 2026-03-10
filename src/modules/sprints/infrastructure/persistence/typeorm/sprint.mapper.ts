import { Sprint } from '../../../domain/entities/sprint.entity';
import { SprintOrmEntity } from './sprint.orm-entity';

export class SprintMapper {
  static toDomain(orm: SprintOrmEntity): Sprint {
    return new Sprint({
      id: orm.id,
      orgId: orm.orgId,
      projectId: orm.projectId,
      name: orm.name,
      goal: orm.goal,
      status: orm.status,
      startDate: orm.startDate,
      endDate: orm.endDate,
      createdBy: orm.createdBy,
      completedAt: orm.completedAt,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }

  static toOrm(domain: Sprint): SprintOrmEntity {
    const orm = new SprintOrmEntity();
    orm.id = domain.id;
    orm.orgId = domain.orgId;
    orm.projectId = domain.projectId;
    orm.name = domain.name;
    orm.goal = domain.goal;
    orm.status = domain.status;
    orm.startDate = domain.startDate;
    orm.endDate = domain.endDate;
    orm.createdBy = domain.createdBy;
    orm.completedAt = domain.completedAt;
    orm.createdAt = domain.createdAt;
    orm.updatedAt = domain.updatedAt;
    return orm;
  }
}
