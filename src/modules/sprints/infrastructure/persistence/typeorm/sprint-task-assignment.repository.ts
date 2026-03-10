import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { ISprintTaskAssignmentRepository } from '../../../domain/repositories/sprint-task-assignment.repository.interface';
import { SprintTaskAssignment } from '../../../domain/entities/sprint-task-assignment.entity';
import { SprintTaskAssignmentOrmEntity } from './sprint-task-assignment.orm-entity';
import { SprintTaskAssignmentMapper } from './sprint-task-assignment.mapper';

@Injectable()
export class SprintTaskAssignmentRepository implements ISprintTaskAssignmentRepository {
  constructor(
    @InjectRepository(SprintTaskAssignmentOrmEntity)
    private readonly repo: Repository<SprintTaskAssignmentOrmEntity>,
  ) {}

  async findBySprintAndTask(
    sprintId: string,
    taskId: string,
  ): Promise<SprintTaskAssignment | null> {
    const orm = await this.repo.findOne({ where: { sprintId, taskId } });
    return orm ? SprintTaskAssignmentMapper.toDomain(orm) : null;
  }

  async findAllBySprint(sprintId: string): Promise<SprintTaskAssignment[]> {
    const orms = await this.repo.find({ where: { sprintId } });
    return orms.map(SprintTaskAssignmentMapper.toDomain);
  }

  async save(assignment: SprintTaskAssignment): Promise<SprintTaskAssignment> {
    const orm = SprintTaskAssignmentMapper.toOrm(assignment);
    const saved = await this.repo.save(orm);
    return SprintTaskAssignmentMapper.toDomain(saved);
  }

  async delete(sprintId: string, taskId: string): Promise<void> {
    await this.repo.delete({ sprintId, taskId });
  }
}
