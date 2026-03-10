import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { ITimeEntryRepository } from '../../../domain/repositories/time-entry.repository.interface';
import { TimeEntry } from '../../../domain/entities/time-entry.entity';
import { TimeEntryOrmEntity } from './time-entry.orm-entity';
import { TimeEntryMapper } from './time-entry.mapper';

@Injectable()
export class TimeEntryRepository implements ITimeEntryRepository {
  constructor(
    @InjectRepository(TimeEntryOrmEntity)
    private readonly repo: Repository<TimeEntryOrmEntity>,
  ) {}

  async findById(id: string, orgId: string): Promise<TimeEntry | null> {
    const orm = await this.repo.findOne({ where: { id, orgId } });
    return orm ? TimeEntryMapper.toDomain(orm) : null;
  }

  async findAllByTask(taskId: string, orgId: string): Promise<TimeEntry[]> {
    const orms = await this.repo.find({
      where: { taskId, orgId },
      order: { startedAt: 'DESC' },
    });
    return orms.map(TimeEntryMapper.toDomain);
  }

  async findAllByUser(userId: string, orgId: string): Promise<TimeEntry[]> {
    const orms = await this.repo.find({
      where: { userId, orgId },
      order: { startedAt: 'DESC' },
    });
    return orms.map(TimeEntryMapper.toDomain);
  }

  async findRunningByUser(userId: string): Promise<TimeEntry | null> {
    const orm = await this.repo.findOne({ where: { userId, isRunning: true } });
    return orm ? TimeEntryMapper.toDomain(orm) : null;
  }

  async save(entry: TimeEntry): Promise<TimeEntry> {
    const orm = TimeEntryMapper.toOrm(entry);
    const saved = await this.repo.save(orm);
    return TimeEntryMapper.toDomain(saved);
  }

  async update(entry: TimeEntry): Promise<TimeEntry> {
    const orm = TimeEntryMapper.toOrm(entry);
    const updated = await this.repo.save(orm);
    return TimeEntryMapper.toDomain(updated);
  }

  async getTotalSecondsByTask(taskId: string): Promise<number> {
    const result = await this.repo
      .createQueryBuilder('entry')
      .select('SUM(entry.duration_seconds)', 'total')
      .where('entry.task_id = :taskId', { taskId })
      .andWhere('entry.is_running = false')
      .getRawOne();
    return Number(result?.total ?? 0);
  }
}
