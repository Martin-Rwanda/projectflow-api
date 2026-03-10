import { Project } from '../entities/project.entity';

export const PROJECT_REPOSITORY = Symbol('IProjectRepository');

export interface IProjectRepository {
  findById(id: string): Promise<Project | null>;
  findBySlugAndOrg(slug: string, orgId: string): Promise<Project | null>;
  findAllByOrg(orgId: string): Promise<Project[]>;
  save(project: Project): Promise<Project>;
  update(project: Project): Promise<Project>;
  existsBySlugAndOrg(slug: string, orgId: string): Promise<boolean>;
}
