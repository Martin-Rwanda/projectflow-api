import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { RemoveTaskFromSprintCommand } from '../commands/remove-task-from-sprint.command';
import type { ISprintRepository } from '../../domain/repositories/sprint.repository.interface';
import { SPRINT_REPOSITORY } from '../../domain/repositories/sprint.repository.interface';
import type { ISprintTaskAssignmentRepository } from '../../domain/repositories/sprint-task-assignment.repository.interface';
import { SPRINT_TASK_ASSIGNMENT_REPOSITORY } from '../../domain/repositories/sprint-task-assignment.repository.interface';

@CommandHandler(RemoveTaskFromSprintCommand)
export class RemoveTaskFromSprintHandler implements ICommandHandler<RemoveTaskFromSprintCommand> {
  constructor(
    @Inject(SPRINT_REPOSITORY)
    private readonly sprintRepository: ISprintRepository,
    @Inject(SPRINT_TASK_ASSIGNMENT_REPOSITORY)
    private readonly assignmentRepository: ISprintTaskAssignmentRepository,
  ) {}

  async execute(command: RemoveTaskFromSprintCommand) {
    const sprint = await this.sprintRepository.findById(command.sprintId, command.orgId);
    if (!sprint) throw new NotFoundException('Sprint not found');

    const existing = await this.assignmentRepository.findBySprintAndTask(
      command.sprintId,
      command.taskId,
    );
    if (!existing) throw new NotFoundException('Task not found in this sprint');

    await this.assignmentRepository.delete(command.sprintId, command.taskId);
    return { message: 'Task removed from sprint' };
  }
}
