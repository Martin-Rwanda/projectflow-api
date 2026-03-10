import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('organizations')
export class OrganizationOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ name: 'logo_url', nullable: true, type: 'varchar' })
  logoUrl: string | null;

  @Column({ name: 'plan_id' })
  planId: string;

  @Column({ name: 'members_count', default: 1 })
  membersCount: number;

  @Column({ name: 'projects_count', default: 0 })
  projectsCount: number;

  @Column({ name: 'storage_used_bytes', type: 'bigint', default: 0 })
  storageUsedBytes: number;

  @Column({ name: 'created_by' })
  createdBy: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
