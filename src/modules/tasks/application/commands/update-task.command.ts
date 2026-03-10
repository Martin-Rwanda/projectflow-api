import { TaskPriority } from '../../domain/entities/task.entity';

export class UpdateTaskCommand {
  constructor(
    public readonly id: string,
    public readonly orgId: string,
    public readonly title?: string,
    public readonly description?: object | null,
    public readonly statusId?: string,
    public readonly priority?: TaskPriority,
    public readonly assigneeId?: string | null,
    public readonly dueDate?: Date | null,
    public readonly estimatedHours?: number | null,
  ) {}
}
