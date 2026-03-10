import { TaskPriority } from '../../domain/entities/task.entity';

export class CreateTaskCommand {
  constructor(
    public readonly orgId: string,
    public readonly projectId: string,
    public readonly title: string,
    public readonly description: object | null,
    public readonly statusId: string | null,
    public readonly priority: TaskPriority,
    public readonly assigneeId: string | null,
    public readonly parentTaskId: string | null,
    public readonly dueDate: Date | null,
    public readonly estimatedHours: number | null,
    public readonly createdBy: string,
  ) {}
}
