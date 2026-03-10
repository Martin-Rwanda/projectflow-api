import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { IActiveTimerRepository } from '../../../domain/repositories/active-timer.repository.interface';
import { ActiveTimer } from '../../../domain/entities/active-timer.entity';
import { ActiveTimerOrmEntity } from './active-timer.orm-entity';
import { ActiveTimerMapper } from './active-timer.mapper';

@Injectable()
export class ActiveTimerRepository implements IActiveTimerRepository {
  constructor(
    @InjectRepository(ActiveTimerOrmEntity)
    private readonly repo: Repository<ActiveTimerOrmEntity>,
  ) {}

  async findByUser(userId: string): Promise<ActiveTimer | null> {
    const orm = await this.repo.findOne({ where: { userId } });
    return orm ? ActiveTimerMapper.toDomain(orm) : null;
  }

  async save(timer: ActiveTimer): Promise<ActiveTimer> {
    const orm = ActiveTimerMapper.toOrm(timer);
    const saved = await this.repo.save(orm);
    return ActiveTimerMapper.toDomain(saved);
  }

  async deleteByUser(userId: string): Promise<void> {
    await this.repo.delete({ userId });
  }
}
