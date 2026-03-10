import { Task } from '../entities/task.entity';

export const TASK_REPOSITORY = Symbol('ITaskRepository');

export interface TaskFilters {
  projectId?: string;
  statusId?: string;
  assigneeId?: string;
  priority?: string;
  parentTaskId?: string | null;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface ITaskRepository {
  findById(id: string, orgId: string): Promise<Task | null>;
  findAll(
    orgId: string,
    filters: TaskFilters,
    pagination: PaginationOptions,
  ): Promise<{ tasks: Task[]; total: number }>;
  save(task: Task): Promise<Task>;
  update(task: Task): Promise<Task>;
  delete(id: string): Promise<void>;
  getMaxOrder(projectId: string): Promise<number>;
}
