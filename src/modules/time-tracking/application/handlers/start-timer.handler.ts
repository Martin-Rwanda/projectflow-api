import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { StartTimerCommand } from '../commands/start-timer.command';
import type { ITimeEntryRepository } from '../../domain/repositories/time-entry.repository.interface';
import { TIME_ENTRY_REPOSITORY } from '../../domain/repositories/time-entry.repository.interface';
import type { IActiveTimerRepository } from '../../domain/repositories/active-timer.repository.interface';
import { ACTIVE_TIMER_REPOSITORY } from '../../domain/repositories/active-timer.repository.interface';
import { ActiveTimer } from '../../domain/entities/active-timer.entity';
import { TimeEntry } from '../../domain/entities/time-entry.entity';

@CommandHandler(StartTimerCommand)
export class StartTimerHandler implements ICommandHandler<StartTimerCommand> {
  constructor(
    @Inject(TIME_ENTRY_REPOSITORY)
    private readonly timeEntryRepository: ITimeEntryRepository,
    @Inject(ACTIVE_TIMER_REPOSITORY)
    private readonly activeTimerRepository: IActiveTimerRepository,
  ) {}

  async execute(command: StartTimerCommand) {
    const existingTimer = await this.activeTimerRepository.findByUser(command.userId);
    if (existingTimer) {
      const runningEntry = await this.timeEntryRepository.findRunningByUser(command.userId);
      if (runningEntry) {
        await this.timeEntryRepository.update(runningEntry.stop(new Date()));
      }
      await this.activeTimerRepository.deleteByUser(command.userId);
    }

    const timeEntry = TimeEntry.create({
      id: uuidv4(),
      orgId: command.orgId,
      taskId: command.taskId,
      userId: command.userId,
      description: command.description,
      startedAt: new Date(),
    });

    const savedEntry = await this.timeEntryRepository.save(timeEntry);

    const activeTimer = ActiveTimer.create({
      id: uuidv4(),
      userId: command.userId,
      orgId: command.orgId,
      taskId: command.taskId,
      timeEntryId: savedEntry.id,
      startedAt: savedEntry.startedAt,
    });

    await this.activeTimerRepository.save(activeTimer);

    return {
      timeEntryId: savedEntry.id,
      taskId: savedEntry.taskId,
      startedAt: savedEntry.startedAt,
      description: savedEntry.description,
    };
  }
}
