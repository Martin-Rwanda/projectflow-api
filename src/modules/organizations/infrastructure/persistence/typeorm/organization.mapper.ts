import { Organization } from '../../../domain/entities/organization.entity';
import { OrganizationOrmEntity } from './organization.orm-entity';

export class OrganizationMapper {
  static toDomain(orm: OrganizationOrmEntity): Organization {
    return new Organization({
      id: orm.id,
      name: orm.name,
      slug: orm.slug,
      logoUrl: orm.logoUrl,
      planId: orm.planId,
      membersCount: Number(orm.membersCount),
      projectsCount: Number(orm.projectsCount),
      storageUsedBytes: Number(orm.storageUsedBytes),
      createdBy: orm.createdBy,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }

  static toOrm(domain: Organization): OrganizationOrmEntity {
    const orm = new OrganizationOrmEntity();
    orm.id = domain.id;
    orm.name = domain.name;
    orm.slug = domain.slug;
    orm.logoUrl = domain.logoUrl;
    orm.planId = domain.planId;
    orm.membersCount = domain.membersCount;
    orm.projectsCount = domain.projectsCount;
    orm.storageUsedBytes = domain.storageUsedBytes;
    orm.createdBy = domain.createdBy;
    orm.createdAt = domain.createdAt;
    orm.updatedAt = domain.updatedAt;
    return orm;
  }
}
