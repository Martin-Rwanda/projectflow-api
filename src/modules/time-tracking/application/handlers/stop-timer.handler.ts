import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { StopTimerCommand } from '../commands/stop-timer.command';
import type { ITimeEntryRepository } from '../../domain/repositories/time-entry.repository.interface';
import { TIME_ENTRY_REPOSITORY } from '../../domain/repositories/time-entry.repository.interface';
import type { IActiveTimerRepository } from '../../domain/repositories/active-timer.repository.interface';
import { ACTIVE_TIMER_REPOSITORY } from '../../domain/repositories/active-timer.repository.interface';

@CommandHandler(StopTimerCommand)
export class StopTimerHandler implements ICommandHandler<StopTimerCommand> {
  constructor(
    @Inject(TIME_ENTRY_REPOSITORY)
    private readonly timeEntryRepository: ITimeEntryRepository,
    @Inject(ACTIVE_TIMER_REPOSITORY)
    private readonly activeTimerRepository: IActiveTimerRepository,
  ) {}

  async execute(command: StopTimerCommand) {
    const activeTimer = await this.activeTimerRepository.findByUser(command.userId);
    if (!activeTimer) throw new NotFoundException('No active timer found');

    const runningEntry = await this.timeEntryRepository.findRunningByUser(command.userId);
    if (!runningEntry) throw new NotFoundException('No running time entry found');

    const endedAt = new Date();
    const stopped = await this.timeEntryRepository.update(runningEntry.stop(endedAt));
    await this.activeTimerRepository.deleteByUser(command.userId);

    return {
      timeEntryId: stopped.id,
      taskId: stopped.taskId,
      startedAt: stopped.startedAt,
      endedAt: stopped.endedAt,
      durationSeconds: stopped.durationSeconds,
      description: stopped.description,
    };
  }
}
