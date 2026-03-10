import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { LogTimeCommand } from '../commands/log-time.command';
import type { ITimeEntryRepository } from '../../domain/repositories/time-entry.repository.interface';
import { TIME_ENTRY_REPOSITORY } from '../../domain/repositories/time-entry.repository.interface';
import { TimeEntry } from '../../domain/entities/time-entry.entity';

@CommandHandler(LogTimeCommand)
export class LogTimeHandler implements ICommandHandler<LogTimeCommand> {
  constructor(
    @Inject(TIME_ENTRY_REPOSITORY)
    private readonly timeEntryRepository: ITimeEntryRepository,
  ) {}

  async execute(command: LogTimeCommand) {
    if (command.endedAt <= command.startedAt) {
      throw new BadRequestException('End time must be after start time');
    }

    const entry = TimeEntry.createManual({
      id: uuidv4(),
      orgId: command.orgId,
      taskId: command.taskId,
      userId: command.userId,
      description: command.description,
      startedAt: command.startedAt,
      endedAt: command.endedAt,
      durationSeconds: null,
    });

    const saved = await this.timeEntryRepository.save(entry);

    return {
      id: saved.id,
      taskId: saved.taskId,
      startedAt: saved.startedAt,
      endedAt: saved.endedAt,
      durationSeconds: saved.durationSeconds,
      description: saved.description,
    };
  }
}
