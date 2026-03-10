import { Sprint } from '../entities/sprint.entity';

export const SPRINT_REPOSITORY = Symbol('ISprintRepository');

export interface ISprintRepository {
  findById(id: string, orgId: string): Promise<Sprint | null>;
  findAllByProject(projectId: string, orgId: string): Promise<Sprint[]>;
  findActiveSprint(projectId: string): Promise<Sprint | null>;
  save(sprint: Sprint): Promise<Sprint>;
  update(sprint: Sprint): Promise<Sprint>;
}
