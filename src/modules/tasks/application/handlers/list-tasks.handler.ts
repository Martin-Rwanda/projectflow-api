import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListTasksQuery } from '../queries/list-tasks.query';
import type { ITaskRepository } from '../../domain/repositories/task.repository.interface';
import { TASK_REPOSITORY } from '../../domain/repositories/task.repository.interface';

@QueryHandler(ListTasksQuery)
export class ListTasksHandler implements IQueryHandler<ListTasksQuery> {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(query: ListTasksQuery) {
    const { tasks, total } = await this.taskRepository.findAll(
      query.orgId,
      query.filters,
      query.pagination,
    );

    return {
      data: tasks.map((t) => ({
        id: t.id,
        projectId: t.projectId,
        title: t.title,
        statusId: t.statusId,
        priority: t.priority,
        assigneeId: t.assigneeId,
        dueDate: t.dueDate,
        order: t.order,
        createdAt: t.createdAt,
      })),
      meta: {
        total,
        page: query.pagination.page,
        limit: query.pagination.limit,
        totalPages: Math.ceil(total / query.pagination.limit),
      },
    };
  }
}
