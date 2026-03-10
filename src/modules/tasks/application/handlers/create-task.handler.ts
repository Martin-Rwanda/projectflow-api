import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskCommand } from '../commands/create-task.command';
import type { ITaskRepository } from '../../domain/repositories/task.repository.interface';
import { TASK_REPOSITORY } from '../../domain/repositories/task.repository.interface';
import type { ITaskStatusRepository } from '../../domain/repositories/task-status.repository.interface';
import { TASK_STATUS_REPOSITORY } from '../../domain/repositories/task-status.repository.interface';
import { Task } from '../../domain/entities/task.entity';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: ITaskRepository,
    @Inject(TASK_STATUS_REPOSITORY)
    private readonly taskStatusRepository: ITaskStatusRepository,
  ) {}

  async execute(command: CreateTaskCommand) {
    let statusId = command.statusId;

    if (!statusId) {
      const defaultStatus = await this.taskStatusRepository.findDefault(command.projectId);
      if (!defaultStatus) throw new NotFoundException('No default status found for this project');
      statusId = defaultStatus.id;
    }

    const maxOrder = await this.taskRepository.getMaxOrder(command.projectId);

    const task = Task.create({
      id: uuidv4(),
      orgId: command.orgId,
      projectId: command.projectId,
      title: command.title,
      description: command.description,
      statusId,
      priority: command.priority,
      assigneeId: command.assigneeId,
      reporterId: command.createdBy,
      parentTaskId: command.parentTaskId,
      order: maxOrder + 1000,
      dueDate: command.dueDate,
      startedAt: null,
      completedAt: null,
      estimatedHours: command.estimatedHours,
      createdBy: command.createdBy,
    });

    const saved = await this.taskRepository.save(task);

    return {
      id: saved.id,
      orgId: saved.orgId,
      projectId: saved.projectId,
      title: saved.title,
      description: saved.description,
      statusId: saved.statusId,
      priority: saved.priority,
      assigneeId: saved.assigneeId,
      reporterId: saved.reporterId,
      parentTaskId: saved.parentTaskId,
      order: saved.order,
      dueDate: saved.dueDate,
      estimatedHours: saved.estimatedHours,
      createdAt: saved.createdAt,
    };
  }
}
