import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { DeleteTaskCommand } from '../commands/delete-task.command';
import type { ITaskRepository } from '../../domain/repositories/task.repository.interface';
import { TASK_REPOSITORY } from '../../domain/repositories/task.repository.interface';
@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler implements ICommandHandler<DeleteTaskCommand> {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(command: DeleteTaskCommand) {
    const task = await this.taskRepository.findById(command.id, command.orgId);
    if (!task) throw new NotFoundException('Task not found');
    await this.taskRepository.delete(command.id);
    return { message: 'Task deleted successfully' };
  }
}
