import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AddTaskToSprintCommand } from '../commands/add-task-to-sprint.command';
import type { ISprintRepository } from '../../domain/repositories/sprint.repository.interface';
import { SPRINT_REPOSITORY } from '../../domain/repositories/sprint.repository.interface';
import type { ISprintTaskAssignmentRepository } from '../../domain/repositories/sprint-task-assignment.repository.interface';
import { SPRINT_TASK_ASSIGNMENT_REPOSITORY } from '../../domain/repositories/sprint-task-assignment.repository.interface';
import { SprintTaskAssignment } from '../../domain/entities/sprint-task-assignment.entity';

@CommandHandler(AddTaskToSprintCommand)
export class AddTaskToSprintHandler implements ICommandHandler<AddTaskToSprintCommand> {
  constructor(
    @Inject(SPRINT_REPOSITORY)
    private readonly sprintRepository: ISprintRepository,
    @Inject(SPRINT_TASK_ASSIGNMENT_REPOSITORY)
    private readonly assignmentRepository: ISprintTaskAssignmentRepository,
  ) {}

  async execute(command: AddTaskToSprintCommand) {
    const sprint = await this.sprintRepository.findById(command.sprintId, command.orgId);
    if (!sprint) throw new NotFoundException('Sprint not found');

    const existing = await this.assignmentRepository.findBySprintAndTask(
      command.sprintId,
      command.taskId,
    );
    if (existing) throw new ConflictException('Task already in this sprint');

    const assignment = SprintTaskAssignment.create({
      id: uuidv4(),
      sprintId: command.sprintId,
      taskId: command.taskId,
      addedBy: command.addedBy,
    });

    return this.assignmentRepository.save(assignment);
  }
}
