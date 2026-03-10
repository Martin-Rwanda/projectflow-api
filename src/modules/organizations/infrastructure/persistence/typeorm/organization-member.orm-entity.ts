import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import type { OrgRole, MemberStatus } from '../../../domain/entities/organization-member.entity';

@Entity('organization_members')
export class OrganizationMemberOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'org_id' })
  orgId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ type: 'varchar' })
  role: OrgRole;

  @Column({ type: 'varchar', default: 'active' })
  status: MemberStatus;

  @Column({ name: 'invited_by', nullable: true, type: 'varchar' })
  invitedBy: string | null;

  @Column({ name: 'joined_at', nullable: true, type: 'timestamptz' })
  joinedAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
