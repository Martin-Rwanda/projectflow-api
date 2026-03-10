import { OrganizationMember } from '../../../domain/entities/organization-member.entity';
import { OrganizationMemberOrmEntity } from './organization-member.orm-entity';

export class OrganizationMemberMapper {
  static toDomain(orm: OrganizationMemberOrmEntity): OrganizationMember {
    return new OrganizationMember({
      id: orm.id,
      orgId: orm.orgId,
      userId: orm.userId,
      role: orm.role,
      status: orm.status,
      invitedBy: orm.invitedBy,
      joinedAt: orm.joinedAt,
      createdAt: orm.createdAt,
    });
  }

  static toOrm(domain: OrganizationMember): OrganizationMemberOrmEntity {
    const orm = new OrganizationMemberOrmEntity();
    orm.id = domain.id;
    orm.orgId = domain.orgId;
    orm.userId = domain.userId;
    orm.role = domain.role;
    orm.status = domain.status;
    orm.invitedBy = domain.invitedBy;
    orm.joinedAt = domain.joinedAt;
    orm.createdAt = domain.createdAt;
    return orm;
  }
}
