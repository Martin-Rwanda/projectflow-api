import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { StartSprintCommand } from '../commands/start-sprint.command';
import type { ISprintRepository } from '../../domain/repositories/sprint.repository.interface';
import { SPRINT_REPOSITORY } from '../../domain/repositories/sprint.repository.interface';

@CommandHandler(StartSprintCommand)
export class StartSprintHandler implements ICommandHandler<StartSprintCommand> {
  constructor(
    @Inject(SPRINT_REPOSITORY)
    private readonly sprintRepository: ISprintRepository,
  ) {}

  async execute(command: StartSprintCommand) {
    const sprint = await this.sprintRepository.findById(command.sprintId, command.orgId);
    if (!sprint) throw new NotFoundException('Sprint not found');
    if (!sprint.isPlanning) throw new BadRequestException('Only planning sprints can be started');

    const activeSprint = await this.sprintRepository.findActiveSprint(sprint.projectId);
    if (activeSprint) throw new BadRequestException('Another sprint is already active');

    const updated = await this.sprintRepository.update(
      sprint.start(command.startDate, command.endDate),
    );

    return {
      id: updated.id,
      name: updated.name,
      status: updated.status,
      startDate: updated.startDate,
      endDate: updated.endDate,
    };
  }
}
