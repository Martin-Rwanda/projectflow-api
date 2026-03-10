import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  TaskFilters,
  PaginationOptions,
} from '../../../domain/repositories/task.repository.interface';

import type { ITaskRepository } from '../../../domain/repositories/task.repository.interface';
import { Task } from '../../../domain/entities/task.entity';
import { TaskOrmEntity } from './task.orm-entity';
import { TaskMapper } from './task.mapper';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectRepository(TaskOrmEntity)
    private readonly repo: Repository<TaskOrmEntity>,
  ) {}

  async findById(id: string, orgId: string): Promise<Task | null> {
    const orm = await this.repo.findOne({ where: { id, orgId } });
    return orm ? TaskMapper.toDomain(orm) : null;
  }

  async findAll(
    orgId: string,
    filters: TaskFilters,
    pagination: PaginationOptions,
  ): Promise<{ tasks: Task[]; total: number }> {
    const qb = this.repo
      .createQueryBuilder('task')
      .where('task.org_id = :orgId', { orgId })
      .andWhere('task.deleted_at IS NULL')
      .orderBy('task.order', 'ASC')
      .skip((pagination.page - 1) * pagination.limit)
      .take(pagination.limit);

    if (filters.projectId)
      qb.andWhere('task.project_id = :projectId', { projectId: filters.projectId });
    if (filters.statusId) qb.andWhere('task.status_id = :statusId', { statusId: filters.statusId });
    if (filters.assigneeId)
      qb.andWhere('task.assignee_id = :assigneeId', { assigneeId: filters.assigneeId });
    if (filters.priority) qb.andWhere('task.priority = :priority', { priority: filters.priority });
    if (filters.parentTaskId !== undefined) {
      filters.parentTaskId === null
        ? qb.andWhere('task.parent_task_id IS NULL')
        : qb.andWhere('task.parent_task_id = :parentTaskId', {
            parentTaskId: filters.parentTaskId,
          });
    }

    const [orms, total] = await qb.getManyAndCount();
    return { tasks: orms.map(TaskMapper.toDomain), total };
  }

  async save(task: Task): Promise<Task> {
    const orm = TaskMapper.toOrm(task);
    const saved = await this.repo.save(orm);
    return TaskMapper.toDomain(saved);
  }

  async update(task: Task): Promise<Task> {
    const orm = TaskMapper.toOrm(task);
    const updated = await this.repo.save(orm);
    return TaskMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.repo.softDelete(id);
  }

  async getMaxOrder(projectId: string): Promise<number> {
    const result = await this.repo
      .createQueryBuilder('task')
      .select('MAX(task.order)', 'max')
      .where('task.project_id = :projectId', { projectId })
      .andWhere('task.deleted_at IS NULL')
      .getRawOne();
    return result?.max ?? 0;
  }
}
