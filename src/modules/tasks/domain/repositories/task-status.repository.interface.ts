import { TaskStatus } from '../entities/task-status.entity';

export const TASK_STATUS_REPOSITORY = Symbol('ITaskStatusRepository');

export interface ITaskStatusRepository {
  findById(id: string): Promise<TaskStatus | null>;
  findByProject(projectId: string): Promise<TaskStatus[]>;
  findDefault(projectId: string): Promise<TaskStatus | null>;
  saveMany(statuses: TaskStatus[]): Promise<TaskStatus[]>;
  save(status: TaskStatus): Promise<TaskStatus>;
}
