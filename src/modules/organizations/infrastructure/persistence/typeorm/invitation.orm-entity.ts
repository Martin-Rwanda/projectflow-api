import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import type { OrgRole } from '../../../domain/entities/organization-member.entity';

@Entity('invitations')
export class InvitationOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'org_id' })
  orgId: string;

  @Column()
  email: string;

  @Column({ type: 'varchar' })
  role: OrgRole;

  @Column({ unique: true })
  token: string;

  @Column({ name: 'invited_by' })
  invitedBy: string;

  @Column({ name: 'expires_at', type: 'timestamptz' })
  expiresAt: Date;

  @Column({ name: 'accepted_at', nullable: true, type: 'timestamptz' })
  acceptedAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
