import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { CompleteSprintCommand } from '../commands/complete-sprint.command';
import type { ISprintRepository } from '../../domain/repositories/sprint.repository.interface';
import { SPRINT_REPOSITORY } from '../../domain/repositories/sprint.repository.interface';

@CommandHandler(CompleteSprintCommand)
export class CompleteSprintHandler implements ICommandHandler<CompleteSprintCommand> {
  constructor(
    @Inject(SPRINT_REPOSITORY)
    private readonly sprintRepository: ISprintRepository,
  ) {}

  async execute(command: CompleteSprintCommand) {
    const sprint = await this.sprintRepository.findById(command.sprintId, command.orgId);
    if (!sprint) throw new NotFoundException('Sprint not found');
    if (!sprint.isActive) throw new BadRequestException('Only active sprints can be completed');

    const updated = await this.sprintRepository.update(sprint.complete());

    return {
      id: updated.id,
      name: updated.name,
      status: updated.status,
      completedAt: updated.completedAt,
    };
  }
}
