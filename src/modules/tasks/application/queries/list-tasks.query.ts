import {
  TaskFilters,
  PaginationOptions,
} from '../../domain/repositories/task.repository.interface';

export class ListTasksQuery {
  constructor(
    public readonly orgId: string,
    public readonly filters: TaskFilters,
    public readonly pagination: PaginationOptions,
  ) {}
}
