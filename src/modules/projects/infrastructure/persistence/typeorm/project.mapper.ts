import { Project } from '../../../domain/entities/project.entity';
import { ProjectOrmEntity } from './project.orm-entity';

export class ProjectMapper {
  static toDomain(orm: ProjectOrmEntity): Project {
    return new Project({
      id: orm.id,
      orgId: orm.orgId,
      name: orm.name,
      slug: orm.slug,
      description: orm.description,
      icon: orm.icon,
      color: orm.color,
      visibility: orm.visibility,
      status: orm.status,
      ownerId: orm.ownerId,
      createdBy: orm.createdBy,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }

  static toOrm(domain: Project): ProjectOrmEntity {
    const orm = new ProjectOrmEntity();
    orm.id = domain.id;
    orm.orgId = domain.orgId;
    orm.name = domain.name;
    orm.slug = domain.slug;
    orm.description = domain.description;
    orm.icon = domain.icon;
    orm.color = domain.color;
    orm.visibility = domain.visibility;
    orm.status = domain.status;
    orm.ownerId = domain.ownerId;
    orm.createdBy = domain.createdBy;
    orm.createdAt = domain.createdAt;
    orm.updatedAt = domain.updatedAt;
    return orm;
  }
}
