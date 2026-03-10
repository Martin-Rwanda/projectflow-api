import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListTimeEntriesQuery } from '../queries/list-time-entries.query';
import type { ITimeEntryRepository } from '../../domain/repositories/time-entry.repository.interface';
import { TIME_ENTRY_REPOSITORY } from '../../domain/repositories/time-entry.repository.interface';

@QueryHandler(ListTimeEntriesQuery)
export class ListTimeEntriesHandler implements IQueryHandler<ListTimeEntriesQuery> {
  constructor(
    @Inject(TIME_ENTRY_REPOSITORY)
    private readonly timeEntryRepository: ITimeEntryRepository,
  ) {}

  async execute(query: ListTimeEntriesQuery) {
    let entries;

    if (query.taskId) {
      entries = await this.timeEntryRepository.findAllByTask(query.taskId, query.orgId);
    } else if (query.userId) {
      entries = await this.timeEntryRepository.findAllByUser(query.userId, query.orgId);
    } else {
      entries = [];
    }

    const total = entries
      .filter((e) => !e.isRunning && e.durationSeconds)
      .reduce((sum, e) => sum + (e.durationSeconds ?? 0), 0);

    return {
      entries: entries.map((e) => ({
        id: e.id,
        taskId: e.taskId,
        userId: e.userId,
        description: e.description,
        startedAt: e.startedAt,
        endedAt: e.endedAt,
        durationSeconds: e.durationSeconds,
        isRunning: e.isRunning,
      })),
      totalSeconds: total,
      totalHours: Math.round((total / 3600) * 100) / 100,
    };
  }
}
