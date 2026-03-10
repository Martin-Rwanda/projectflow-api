import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import type { ProjectVisibility, ProjectStatus } from '../../../domain/entities/project.entity';

@Entity('projects')
export class ProjectOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'org_id' })
  orgId: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ nullable: true, type: 'text' })
  description: string | null;

  @Column({ nullable: true, type: 'varchar' })
  icon: string | null;

  @Column({ nullable: true, type: 'varchar' })
  color: string | null;

  @Column({ type: 'varchar', default: 'public_to_org' })
  visibility: ProjectVisibility;

  @Column({ type: 'varchar', default: 'active' })
  status: ProjectStatus;

  @Column({ name: 'owner_id' })
  ownerId: string;

  @Column({ name: 'created_by' })
  createdBy: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
