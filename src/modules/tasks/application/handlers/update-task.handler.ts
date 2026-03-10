import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { UpdateTaskCommand } from '../commands/update-task.command';
import type { ITaskRepository } from '../../domain/repositories/task.repository.interface';
import { TASK_REPOSITORY } from '../../domain/repositories/task.repository.interface';

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler implements ICommandHandler<UpdateTaskCommand> {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(command: UpdateTaskCommand) {
    let task = await this.taskRepository.findById(command.id, command.orgId);
    if (!task) throw new NotFoundException('Task not found');

    if (
      command.title !== undefined ||
      command.description !== undefined ||
      command.dueDate !== undefined ||
      command.estimatedHours !== undefined
    ) {
      task = task.updateDetails(
        command.title ?? task.title,
        command.description !== undefined ? command.description : task.description,
        command.dueDate !== undefined ? command.dueDate : task.dueDate,
        command.estimatedHours !== undefined ? command.estimatedHours : task.estimatedHours,
      );
    }

    if (command.statusId) task = task.changeStatus(command.statusId);
    if (command.priority) task = task.changePriority(command.priority);
    if (command.assigneeId !== undefined) {
      task = command.assigneeId ? task.assign(command.assigneeId) : task.unassign();
    }

    const updated = await this.taskRepository.update(task);

    return {
      id: updated.id,
      title: updated.title,
      description: updated.description,
      statusId: updated.statusId,
      priority: updated.priority,
      assigneeId: updated.assigneeId,
      dueDate: updated.dueDate,
      estimatedHours: updated.estimatedHours,
      updatedAt: updated.updatedAt,
    };
  }
}
