import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { GetTaskQuery } from '../queries/get-task.query';
import type { ITaskRepository } from '../../domain/repositories/task.repository.interface';
import { TASK_REPOSITORY } from '../../domain/repositories/task.repository.interface';

@QueryHandler(GetTaskQuery)
export class GetTaskHandler implements IQueryHandler<GetTaskQuery> {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(query: GetTaskQuery) {
    const task = await this.taskRepository.findById(query.taskId, query.orgId);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }
}
