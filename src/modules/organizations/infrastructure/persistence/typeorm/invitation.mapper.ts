import { Invitation } from '../../../domain/entities/invitation.entity';
import { InvitationOrmEntity } from './invitation.orm-entity';

export class InvitationMapper {
  static toDomain(orm: InvitationOrmEntity): Invitation {
    return new Invitation({
      id: orm.id,
      orgId: orm.orgId,
      email: orm.email,
      role: orm.role,
      token: orm.token,
      invitedBy: orm.invitedBy,
      expiresAt: orm.expiresAt,
      acceptedAt: orm.acceptedAt,
      createdAt: orm.createdAt,
    });
  }

  static toOrm(domain: Invitation): InvitationOrmEntity {
    const orm = new InvitationOrmEntity();
    orm.id = domain.id;
    orm.orgId = domain.orgId;
    orm.email = domain.email;
    orm.role = domain.role;
    orm.token = domain.token;
    orm.invitedBy = domain.invitedBy;
    orm.expiresAt = domain.expiresAt;
    orm.acceptedAt = domain.acceptedAt;
    orm.createdAt = domain.createdAt;
    return orm;
  }
}
