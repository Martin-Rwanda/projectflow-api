import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetActiveTimerQuery } from '../queries/get-active-timer.query';
import type { IActiveTimerRepository } from '../../domain/repositories/active-timer.repository.interface';
import { ACTIVE_TIMER_REPOSITORY } from '../../domain/repositories/active-timer.repository.interface';

@QueryHandler(GetActiveTimerQuery)
export class GetActiveTimerHandler implements IQueryHandler<GetActiveTimerQuery> {
  constructor(
    @Inject(ACTIVE_TIMER_REPOSITORY)
    private readonly activeTimerRepository: IActiveTimerRepository,
  ) {}

  async execute(query: GetActiveTimerQuery) {
    const timer = await this.activeTimerRepository.findByUser(query.userId);
    if (!timer) return null;

    return {
      taskId: timer.taskId,
      timeEntryId: timer.timeEntryId,
      startedAt: timer.startedAt,
      elapsedSeconds: timer.elapsedSeconds,
    };
  }
}
