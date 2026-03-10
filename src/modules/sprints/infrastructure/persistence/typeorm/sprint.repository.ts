import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { ISprintRepository } from '../../../domain/repositories/sprint.repository.interface';
import { Sprint } from '../../../domain/entities/sprint.entity';
import { SprintOrmEntity } from './sprint.orm-entity';
import { SprintMapper } from './sprint.mapper';

@Injectable()
export class SprintRepository implements ISprintRepository {
  constructor(
    @InjectRepository(SprintOrmEntity)
    private readonly repo: Repository<SprintOrmEntity>,
  ) {}

  async findById(id: string, orgId: string): Promise<Sprint | null> {
    const orm = await this.repo.findOne({ where: { id, orgId } });
    return orm ? SprintMapper.toDomain(orm) : null;
  }

  async findAllByProject(projectId: string, orgId: string): Promise<Sprint[]> {
    const orms = await this.repo.find({
      where: { projectId, orgId },
      order: { createdAt: 'DESC' },
    });
    return orms.map(SprintMapper.toDomain);
  }

  async findActiveSprint(projectId: string): Promise<Sprint | null> {
    const orm = await this.repo.findOne({ where: { projectId, status: 'active' } });
    return orm ? SprintMapper.toDomain(orm) : null;
  }

  async save(sprint: Sprint): Promise<Sprint> {
    const orm = SprintMapper.toOrm(sprint);
    const saved = await this.repo.save(orm);
    return SprintMapper.toDomain(saved);
  }

  async update(sprint: Sprint): Promise<Sprint> {
    const orm = SprintMapper.toOrm(sprint);
    const updated = await this.repo.save(orm);
    return SprintMapper.toDomain(updated);
  }
}
