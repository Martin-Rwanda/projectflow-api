import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITaskStatusRepository } from '../../../domain/repositories/task-status.repository.interface';
import { TaskStatus } from '../../../domain/entities/task-status.entity';
import { TaskStatusOrmEntity } from './task-status.orm-entity';
import { TaskStatusMapper } from './task-status.mapper';

@Injectable()
export class TaskStatusRepository implements ITaskStatusRepository {
  constructor(
    @InjectRepository(TaskStatusOrmEntity)
    private readonly repo: Repository<TaskStatusOrmEntity>,
  ) {}

  async findById(id: string): Promise<TaskStatus | null> {
    const orm = await this.repo.findOne({ where: { id } });
    return orm ? TaskStatusMapper.toDomain(orm) : null;
  }

  async findByProject(projectId: string): Promise<TaskStatus[]> {
    const orms = await this.repo.find({ where: { projectId }, order: { position: 'ASC' } });
    return orms.map(TaskStatusMapper.toDomain);
  }

  async findDefault(projectId: string): Promise<TaskStatus | null> {
    const orm = await this.repo.findOne({ where: { projectId, isDefault: true } });
    return orm ? TaskStatusMapper.toDomain(orm) : null;
  }

  async saveMany(statuses: TaskStatus[]): Promise<TaskStatus[]> {
    const orms = statuses.map(TaskStatusMapper.toOrm);
    const saved = await this.repo.save(orms);
    return saved.map(TaskStatusMapper.toDomain);
  }

  async save(status: TaskStatus): Promise<TaskStatus> {
    const orm = TaskStatusMapper.toOrm(status);
    const saved = await this.repo.save(orm);
    return TaskStatusMapper.toDomain(saved);
  }
}
