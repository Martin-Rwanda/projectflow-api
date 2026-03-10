import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateSprintCommand } from '../commands/create-sprint.command';
import type { ISprintRepository } from '../../domain/repositories/sprint.repository.interface';
import { SPRINT_REPOSITORY } from '../../domain/repositories/sprint.repository.interface';
import { Sprint } from '../../domain/entities/sprint.entity';

@CommandHandler(CreateSprintCommand)
export class CreateSprintHandler implements ICommandHandler<CreateSprintCommand> {
  constructor(
    @Inject(SPRINT_REPOSITORY)
    private readonly sprintRepository: ISprintRepository,
  ) {}

  async execute(command: CreateSprintCommand) {
    const activeSprint = await this.sprintRepository.findActiveSprint(command.projectId);
    if (activeSprint) {
      throw new BadRequestException(
        'A sprint is already active for this project. Complete it before creating a new one.',
      );
    }

    const sprint = Sprint.create({
      id: uuidv4(),
      orgId: command.orgId,
      projectId: command.projectId,
      name: command.name,
      goal: command.goal,
      startDate: null,
      endDate: null,
      createdBy: command.createdBy,
    });

    const saved = await this.sprintRepository.save(sprint);

    return {
      id: saved.id,
      projectId: saved.projectId,
      name: saved.name,
      goal: saved.goal,
      status: saved.status,
      startDate: saved.startDate,
      endDate: saved.endDate,
      createdAt: saved.createdAt,
    };
  }
}
